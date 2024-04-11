import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class AuthGuard implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    if (!request.cookies?.token) {
      throw new UnauthorizedException('No token provided');
    }

    try {
      const user = await jwt.verify(
        request.cookies.token,
        process.env.JWT_SECRET,
      );
      if (!user) {
        throw new ForbiddenException('Invalid token');
      }
    } catch (e) {
      throw new ForbiddenException('Invalid token');
    }

    return true;
  }
}
