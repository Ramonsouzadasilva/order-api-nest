import { Injectable } from '@nestjs/common';
import { GetAllUsersUseCase } from '../../core/use-cases/users/get-all-users.use-case';
import { GetUserByIdUseCase } from '../../core/use-cases/users/get-user-by-id.use-case';
import { UpdateUserUseCase } from '../../core/use-cases/users/update-user.use-case';
import { DeleteUserUseCase } from '../../core/use-cases/users/delete-user.use-case';
import { UpdateUserDto } from '../../presentation/dtos/user.dto';
import { UserEntity } from '../../core/entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    private readonly getAllUsersUseCase: GetAllUsersUseCase,
    private readonly getUserByIdUseCase: GetUserByIdUseCase,
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly deleteUserUseCase: DeleteUserUseCase,
  ) {}

  async findAll(): Promise<UserEntity[]> {
    return this.getAllUsersUseCase.execute();
  }

  async findOne(id: string): Promise<UserEntity> {
    return this.getUserByIdUseCase.execute({ id });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.updateUserUseCase.execute({ id, ...updateUserDto });
  }

  async remove(id: string): Promise<void> {
    return this.deleteUserUseCase.execute({ id });
  }
}
