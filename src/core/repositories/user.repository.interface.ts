import { UserRole } from '@prisma/client';
import type { UserEntity } from '../entities/user.entity';

export interface CreateUserData {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

export interface UpdateUserData {
  email?: string;
  name?: string;
  password?: string;
  role?: UserRole;
}

export interface IUserRepository {
  create(data: CreateUserData): Promise<UserEntity>;
  findById(id: string): Promise<UserEntity | null>;
  findByEmail(email: string): Promise<UserEntity | null>;
  findAll(): Promise<UserEntity[]>;
  update(id: string, data: UpdateUserData): Promise<UserEntity>;
  delete(id: string): Promise<void>;
}
