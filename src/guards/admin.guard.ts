import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AdminGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.cookies?.token) {
      return false;
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