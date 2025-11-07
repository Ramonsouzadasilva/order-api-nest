import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../../common/guards/roles.guard';
import { Roles } from '../../common/decorators/roles.decorator';
import { MetricsService } from '../../modules/metrics/metrics.service';
import { MetricsQueryDto } from '../dtos/metrics.dto';
import { UserRole } from '@prisma/client';

@Controller('metrics')
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles(UserRole.ADMIN)
export class MetricsController {
  constructor(private readonly metricsService: MetricsService) {}

  @Get('sales')
  async getSalesMetrics(query: MetricsQueryDto) {
    return this.metricsService.getSalesMetrics(query);
  }

  @Get('orders')
  async getOrderMetrics(query: MetricsQueryDto) {
    return this.metricsService.getOrderMetrics(query);
  }

  @Get('general')
  async getGeneralMetrics(query: MetricsQueryDto) {
    return this.metricsService.getGeneralMetrics(query);
  }
}
