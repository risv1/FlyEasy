import { Body, Controller, Delete, Get, Param, Patch, UseGuards } from "@nestjs/common";
import { AdminUserService } from "./admin.users.service";
import { AdminGuard } from "src/guards/admin.guard";

@Controller("/admin")
export class AdminUserController {
      
    constructor(private readonly adminUserService: AdminUserService) {}
    
    @Get("/users")
    @UseGuards(AdminGuard)
    getUsers(){
        try{
        return this.adminUserService.getUsers();
        } catch (error) {
            return { message: "Failed to get users" };
        }
    }

    @Get("/users/:id")
    @UseGuards(AdminGuard)
    getUserById(@Param() userId: string){
        try{
        return this.adminUserService.getUserById(userId);
        } catch (error) {
            return { message: "Failed to get user" };
        }
    }

    @Patch("/users/:id")
    @UseGuards(AdminGuard)
    updateUser(@Param() userId: string, @Body() user: any){
        try{
        return this.adminUserService.updateUser(userId, user);
        } catch (error) {
            return { message: "Failed to update user" };
        }
    }

    @Delete("/users/:id")
    @UseGuards(AdminGuard)
    deleteUser(@Param() userId: string){
        try{
        return this.adminUserService.deleteUser(userId);
        } catch (error) {
            return { message: "Failed to delete user" };
        }
    }
}