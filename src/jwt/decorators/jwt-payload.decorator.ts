import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtPipe } from '../pipes/jwt.pipe';

export const GetAuhtorizationHeaders = createParamDecorator(
  (_, context: ExecutionContext) => {
    const req = context.switchToHttp().getRequest();
    return req.headers.authorization;
  },
);

export const IJwtPayloadDecorator = () => GetAuhtorizationHeaders(JwtPipe);
