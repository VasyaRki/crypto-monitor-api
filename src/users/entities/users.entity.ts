import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { UserRoleEnum } from '../enums/user.role.enum';

@Entity('users')
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar' })
  email: string;

  @Column({ type: 'varchar' })
  hashedPassword: string;

  @Column({ type: 'enum', enum: UserRoleEnum, default: UserRoleEnum.USER })
  role: UserRoleEnum;
}
