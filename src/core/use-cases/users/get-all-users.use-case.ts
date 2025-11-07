import { Injectable } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { UserRepository } from '@/infrastructure/database/repositories/user.repository';

@Injectable()
export class GetAllUsersUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(): Promise<UserEntity[]> {
    return this.userRepository.findAll();
  }
}
