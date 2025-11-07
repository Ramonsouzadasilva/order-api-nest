import { UserRepository } from '@/infrastructure/database/repositories/user.repository';
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';

export interface DeleteUserUseCaseInput {
  id: string;
}

@Injectable()
export class DeleteUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(input: DeleteUserUseCaseInput): Promise<void> {
    const { id } = input;

    // Check if user exists
    const user = await this.userRepository.findById(id);
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Prevent deletion of admin users (optional business rule)
    if (user.role === 'ADMIN') {
      throw new BadRequestException('Cannot delete admin users');
    }

    // Delete user
    await this.userRepository.delete(id);
  }
}
