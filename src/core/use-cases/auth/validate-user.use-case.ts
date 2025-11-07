import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserEntity } from '../../entities/user.entity';
import { JwtPayload } from '../../../common/types/user.types';
import { UserRepository } from '@/infrastructure/database/repositories/user.repository';

@Injectable()
export class ValidateUserUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(payload: JwtPayload): Promise<UserEntity> {
    const user = await this.userRepository.findById(payload.sub);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    return user;
  }
}
