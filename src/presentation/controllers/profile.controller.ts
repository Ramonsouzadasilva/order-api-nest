import { Controller, Get, Put, Body, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { UsersService } from '../../modules/users/users.service';
import { UpdateProfileDto } from '../dtos/profile.dto';
import { AuthenticatedUser } from '../../common/types/user.types';

@Controller('profile')
@UseGuards(JwtAuthGuard)
export class ProfileController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getProfile(user: AuthenticatedUser) {
    return this.usersService.findOne(user.id);
  }

  @Put()
  async updateProfile(
    user: AuthenticatedUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.update(user.id, updateProfileDto);
  }
}
