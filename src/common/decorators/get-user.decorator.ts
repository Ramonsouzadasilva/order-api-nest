import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { AuthenticatedUser } from '../types/user.types';

export const GetUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): AuthenticatedUser => {
    const request: Request & { user: AuthenticatedUser } = ctx
      .switchToHttp()
      .getRequest();
    return request.user;
  },
);
