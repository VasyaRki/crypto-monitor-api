import { UserRoleEnum } from '../../users/enums/user.role.enum';

export interface IJwtPayload {
  readonly id: number;
  readonly role: UserRoleEnum;
}
