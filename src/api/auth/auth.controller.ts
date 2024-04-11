import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDto } from 'src/dto/users.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post("/register")
  registerUser(@Body() user: UserDto){
    return this.authService.registerUser(user);
  }

  @Post("/login")
  loginUser(@Body() user: UserDto){
    return this.authService.loginUser(user);
  }
}
