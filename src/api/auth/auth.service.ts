import { HttpException, Injectable } from "@nestjs/common";
import { UserDto } from "src/dto/users.dto";
import { db } from "src/database/db";
import { users } from "src/database/schema";
import { v4 as uuid } from "uuid";
import * as bcrypt from "bcrypt";
import { eq } from "drizzle-orm";

@Injectable()
export class AuthService {

    async registerUser(user: UserDto){
        if ( !user.name || !user.email || !user.password ) {
            throw new HttpException("Missing required fields", 400);
        }

        const [userExists] = await db.select().from(users).where(eq(users.email, user.email))
        if (userExists) {
            throw new HttpException("User already exists", 409);
        }

        const hashedPassword = await bcrypt.hash(user.password, 10);  
    
        const newUser = {
            id: uuid(),
            name: String(user.name),
            email: String(user.email),
            password: String(hashedPassword),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
        }

        const insertUser = await db.insert(users).values(newUser)
        if (!insertUser) {
            throw new HttpException("Failed to insert user", 500);
        }

        return { message: "User registered successfully", user: newUser};
    }

    async loginUser(user: UserDto){
        if(!user.email || !user.password){
            throw new HttpException("Missing required fields", 400);
        }
        const [userExists] = await db.select().from(users).where(eq(users.email, user.email))
        if (!userExists) {
            throw new HttpException("User not found", 404);
        }

        const passwordMatch = await bcrypt.compare(user.password, userExists.password)
        if (!passwordMatch) {
            throw new HttpException("Invalid password", 401);
        }

        return { message: "User logged in successfully", user: userExists};

    }

}