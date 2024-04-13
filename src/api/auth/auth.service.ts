import { HttpException, Injectable } from '@nestjs/common';
import { UserDto } from 'src/dto/users.dto';
import { db } from 'src/database/db';
import { users } from 'src/database/schema';
import { v4 as uuid } from 'uuid';
import * as bcrypt from 'bcrypt';
import { eq } from 'drizzle-orm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthService {
  async registerUser(user: UserDto) {
    if (!user.name || !user.email || !user.password) {
      throw new HttpException('Missing required fields', 400);
    }

    const [userExists] = await db
      .select()
      .from(users)
      .where(eq(users.email, user.email));
    if (userExists) {
      throw new HttpException('User already exists', 409);
    }

    const hashedPassword = await bcrypt.hash(user.password, 10);

    const newUser = {
      id: uuid(),
      name: String(user.name),
      email: String(user.email),
      password: String(hashedPassword),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      role: 'user',
    };

    const insertUser = await db.insert(users).values(newUser);
    if (!insertUser) {
      throw new HttpException('Failed to insert user', 500);
    }

    return {
      message: 'User registered successfully',
      user: {
        name: newUser.name,
        email: newUser.email,
      },
    };
  }

  async loginUser(user: { email: string; password: string }, res: any) {
    if (!user.email || !user.password) {
      throw new HttpException('Missing required fields', 400);
    }
    const [userExists]: UserDto[] = await db
      .select()
      .from(users)
      .where(eq(users.email, user.email));
    if (!userExists) {
      throw new HttpException('User not found', 404);
    }

    const passwordMatch = await bcrypt.compare(
      user.password,
      userExists.password,
    );
    if (!passwordMatch) {
      throw new HttpException('Invalid password', 401);
    }

    const token = jwt.sign(
      {
        id: userExists.id,
        name: userExists.name,
        email: userExists.email,
        role: userExists.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: '1h' },
    );
    res.cookie('token', token, { httpOnly: true });

    return res.json({
      message: 'Login successful',
      user: {
        name: userExists.name,
        email: userExists.email,
      },
    });
  }

  async logoutUser(res: any) {
    const token = res.cookies.token;
    if (!token) {
      throw new HttpException('No token provided', 401);
    }

    res.clearCookie('token');
    return res.json({ message: 'Logout successful' });
  }
}
