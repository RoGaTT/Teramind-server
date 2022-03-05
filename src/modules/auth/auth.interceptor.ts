import { createParamDecorator, ExecutionContext, Inject } from '@nestjs/common';
import { User } from '../user/entities/user.entity';
import { UserService } from '../user/user.service';

export const UserId = createParamDecorator<string>(
  async (data: unknown, ctx: ExecutionContext) => {
    const userService = Inject(UserService);
    console.log(userService);
    const request = ctx.switchToHttp().getRequest();

    return request.user?.userId;
  },
);
