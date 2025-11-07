/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { UserEntity } from '../../entities/user.entity';
import { UserRole } from '@prisma/client';
import { UserRepository } from '@/infrastructure/database/repositories/user.repository';

export interface UpdateUserUseCaseInput {
  id: string;
  email?: string;
  name?: string;
  password?: string;
  role?: UserRole;
}

@Injectable()
export class UpdateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: UpdateUserUseCaseInput): Promise<UserEntity> {
    const { id, email, name, password, role } = input;

    // Check if user exists
    const existingUser = await this.userRepository.findById(id);
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Check if email is already taken by another user
    if (email && email !== existingUser.email) {
      const userWithEmail = await this.userRepository.findByEmail(email);
      if (userWithEmail && userWithEmail.id !== id) {
        throw new ConflictException('Email is already taken by another user');
      }
    }

    // Prepare update data
    const updateData: any = {};
    if (email) updateData.email = email;
    if (name) updateData.name = name;
    if (role) updateData.role = role;

    // Hash password if provided
    if (password) {
      updateData.password = await bcrypt.hash(password, 12);
    }

    // Update user
    return this.userRepository.update(id, updateData);
  }
}
