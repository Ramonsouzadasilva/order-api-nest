import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { UsersController } from '../../presentation/controllers/users.controller';
import { ProfileController } from '../../presentation/controllers/profile.controller';
import { UsersService } from './users.service';
import { UserRepository } from '../../infrastructure/database/repositories/user.repository';
import { GetAllUsersUseCase } from '../../core/use-cases/users/get-all-users.use-case';
import { GetUserByIdUseCase } from '../../core/use-cases/users/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../../core/use-cases/users/update-user.use-case';
import { DeleteUserUseCase } from '../../core/use-cases/users/delete-user.use-case';

@Module({
  controllers: [UsersController, ProfileController],
  providers: [
    UsersService,
    PrismaService,
    UserRepository,
    GetAllUsersUseCase,
    GetUserByIdUseCase,
    UpdateUserUseCase,
    DeleteUserUseCase,
  ],
  exports: [UsersService],
})
export class UsersModule {}
