/* eslint-disable @typescript-eslint/no-unused-vars */
import { UserRole } from '@prisma/client';

export class UserEntity {
  id: string;
  email: string;
  name: string;
  password: string;
  role: UserRole;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }

  // Remove password from serialization
  toJSON() {
    const { password, ...result } = this;
    return result;
  }
}
