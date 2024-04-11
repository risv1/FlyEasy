import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.cookies?.token) {
      return false;
    }

    try {
      const user = await jwt.verify(request.cookies.token, process.env.JWT_SECRET);
      if (!user) {
        return false;
      }
    } catch (e) {
      return false;
    }

    return true;
  }
}