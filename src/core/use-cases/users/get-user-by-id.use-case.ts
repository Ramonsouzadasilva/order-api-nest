import { Injectable, NotFoundException } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '@/infrastructure/database/repositories/user.repository';

export interface GetUserByIdUseCaseInput {
  id: string;
}

@Injectable()
export class GetUserByIdUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: GetUserByIdUseCaseInput): Promise<UserEntity> {
    const { id } = input;

    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return user;
  }
}
