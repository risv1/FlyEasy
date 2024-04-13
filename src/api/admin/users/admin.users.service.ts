import { HttpException, Injectable } from '@nestjs/common';
import { eq } from 'drizzle-orm';
import { db } from 'src/database/db';
import { users } from 'src/database/schema';
import { UserDto } from 'src/dto/users.dto';

@Injectable()
export class AdminUserService {
  async getUsers() {
    const allUsers = await db.select().from(users);
    if (!allUsers) {
      throw new HttpException('No users found', 404);
    }

    if (allUsers.length === 0) {
      throw new HttpException('No users found', 404);
    }

    return { message: 'Users found', users: allUsers };
  }

  async getUserById(userId: string) {
    const [user]: UserDto[] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (!user) {
      throw new HttpException('User not found', 404);
    }

    return { message: 'User found', user: user };
  }

  async updateUser(userId: string, user: UserDto) {
    const [userExists]: UserDto[] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (!userExists) {
      throw new HttpException('User not found', 404);
    }

    const updatedUserData = {
      name: user.name ? String(user.name) : userExists.name,
      email: user.email ? String(user.email) : userExists.email,
      role: user.role ? String(user.role) : userExists.role,
      updatedAt: new Date().toISOString(),
    };
    if (user.password.length < 8) {
      throw new HttpException(
        'Password must be at least 8 characters long',
        400,
      );
    }
    if (user.name.length > 40) {
      throw new HttpException('Name must be less than 40 characters long', 400);
    }

    const updatedUser = await db
      .update(users)
      .set(updatedUserData)
      .where(eq(users.id, userId));
    if (!updatedUser) {
      throw new HttpException('Failed to update user', 500);
    }

    return { message: 'User updated successfully', user: updatedUser };
  }

  async deleteUser(userId: string) {
    const [userExists]: UserDto[] = await db
      .select()
      .from(users)
      .where(eq(users.id, userId));
    if (!userExists) {
      throw new HttpException('User not found', 404);
    }

    const deletedUser = await db.delete(users).where(eq(users.id, userId));
    if (!deletedUser) {
      throw new HttpException('Failed to delete user', 500);
    }

    return { message: 'User deleted successfully' };
  }
}
