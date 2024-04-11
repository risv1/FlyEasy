import { Injectable, CanActivate, ExecutionContext, UnauthorizedException } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.cookies?.token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const user: any = await jwt.verify(request.cookies.token, process.env.JWT_SECRET);
      if (!user) {
        return false;
      }

      if (user.role !== 'admin') {
        return false;
      }
    } catch (e) {
      return false;
    }

    return true;
  }
}