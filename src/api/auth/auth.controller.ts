import { Body, Controller, Get, Post, Res, Response, UsePipes } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto, UserSchema } from 'src/dto/users.dto';
import { ZodValidationPipe } from 'src/pipes/zod';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  @UsePipes(new ZodValidationPipe(UserSchema))
  registerUser(@Body() user: UserDto, @Res() res: any){
    try{
    return this.authService.registerUser(user);
    } catch (error) {
      return res.status(500).json({ message: "Failed to register user" });
    }
  }

  @Post("/login")
  loginUser(@Body() user: {email: string, password: string}, @Res() res: any){
    try{
    return this.authService.loginUser(user, res);
    } catch (error) {
      return res.status(500).json({ message: "Failed to login user" });
    }
  }

  @Post("/logout")
  logoutUser(@Res() res: any){
    try{
    return this.authService.logoutUser(res);
    } catch (error) {
      return res.status(500).json({ message: "Failed to logout user" });
    }
  }

}
