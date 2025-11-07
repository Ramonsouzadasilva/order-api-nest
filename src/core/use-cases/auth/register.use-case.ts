import { Injectable, ConflictException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '@/core/repositories/user.repository.interface';
import { UserRole } from '@prisma/client';

export interface RegisterUseCaseInput {
  email: string;
  name: string;
  password: string;
  role?: UserRole;
}

@Injectable()
export class RegisterUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: RegisterUseCaseInput): Promise<UserEntity> {
    const { email, name, password, role } = input;

    const existingUser = await this.userRepository.findByEmail(email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await this.userRepository.create({
      email,
      name,
      password: hashedPassword,
      role: role ?? UserRole.USER,
    });

    return user;
  }
}
