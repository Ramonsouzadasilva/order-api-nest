import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import type { UserEntity } from '../../entities/user.entity';
import { IUserRepository } from '@/core/repositories/user.repository.interface';

export interface LoginUseCaseInput {
  email: string;
  password: string;
}

@Injectable()
export class LoginUseCase {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: LoginUseCaseInput): Promise<UserEntity> {
    const { email, password } = input;

    const user = await this.userRepository.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return user;
  }
}
