import {
  Inject,
  Injectable,
  CanActivate,
  ExecutionContext,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { UsersService } from 'src/users/users.service';
import { DomainError } from '../../common/domain.error';
import { JWT_CONSTANTS } from '../../jwt/jwt.constants';
import { AuthError } from '../../auth/errors/auth.error';
import { JwtTypes } from '../../jwt/enums/jwt-types.enum';
import { UserRoleEnum } from '../../users/enums/user.role.enum';
import { JwtService } from '../../jwt/interfaces/jwt-service.interface';
import { IJwtPayload } from '../../jwt/interfaces/jwt-payload.interface';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    @Inject(JWT_CONSTANTS.APPLICATION.SERVICE_TOKEN)
    private jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly usersService: UsersService,
  ) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const authorizationHeaders = req.headers.authorization;

      const accessToken =
        JwtAuthGuard.extractTokenFromAuthorizationHeaders(authorizationHeaders);

      const payload: IJwtPayload = this.jwtService.verify(
        accessToken,
        JwtTypes.Access,
      );

      const requiredRoles = this.reflector.get<UserRoleEnum[]>(
        'requiredRoles',
        context.getHandler(),
      );

      if (requiredRoles) {
        const hasRole = requiredRoles.includes(payload.role);
        if (!hasRole) throw AuthError.Forbidden();
      }

      await this.setContextUser(payload.id, context);

      return true;
    } catch (err) {
      if (err instanceof DomainError) {
        throw new UnauthorizedException(err.message);
      }

      throw new BadRequestException(err.message);
    }
  }

  public static extractTokenFromAuthorizationHeaders(
    authorizationHeaders: string,
  ): string {
    if (!authorizationHeaders) {
      throw AuthError.AuthorizationHeadersNotProvided();
    }

    const tokenType = authorizationHeaders.split(' ')[0];
    const token = authorizationHeaders.split(' ')[1];

    if (tokenType !== 'Bearer' || !token) {
      throw AuthError.InvalidAuthHeaders();
    }

    return token;
  }

  private async setContextUser(userId: number, context: any): Promise<void> {
    const currentUser = await this.usersService.findById(userId);
    context.user = currentUser;
  }
}
