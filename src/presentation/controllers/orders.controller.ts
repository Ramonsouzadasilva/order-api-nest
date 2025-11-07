import {
  Controller,
  Get,
  Post,
  Put,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { GetUser } from '../../common/decorators/get-user.decorator';
import { AuthenticatedUser } from '../../common/types/user.types';
import { OrdersService } from '../../modules/orders/orders.service';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dtos/order.dto';
import { UserRole } from '@prisma/client';

@Controller('orders')
@UseGuards(JwtAuthGuard)
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post()
  async create(
    @Body() createOrderDto: CreateOrderDto,
    @GetUser() user: AuthenticatedUser,
  ) {
    return this.ordersService.create(user.id, createOrderDto);
  }

  @Get()
  async findAll(@GetUser() user: AuthenticatedUser) {
    return this.ordersService.findAll(user.id, user.role);
  }

  @Get(':id')
  async findOne(@Param('id') id: string, @GetUser() user: AuthenticatedUser) {
    return this.ordersService.findOne(id, user.id, user.role);
  }

  @Put(':id/status')
  @UseGuards(RolesGuard)
  @Roles(UserRole.ADMIN)
  async updateStatus(
    @Param('id') id: string,
    @Body() updateOrderStatusDto: UpdateOrderStatusDto,
  ) {
    return this.ordersService.updateStatus(id, updateOrderStatusDto);
  }
}
