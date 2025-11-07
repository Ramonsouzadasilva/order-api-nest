import { Module } from '@nestjs/common';
import { PrismaService } from '../../infrastructure/database/prisma.service';
import { MetricsController } from '../../presentation/controllers/metrics.controller';
import { MetricsService } from './metrics.service';
import { MetricsRepository } from '../../infrastructure/database/repositories/metrics.repository';
import { GetSalesMetricsUseCase } from '../../core/use-cases/metrics/get-sales-metrics.use-case';
import { GetOrderMetricsUseCase } from '../../core/use-cases/metrics/get-order-metrics.use-case';
import { GetGeneralMetricsUseCase } from '../../core/use-cases/metrics/get-general-metrics.use-case';

@Module({
  controllers: [MetricsController],
  providers: [
    MetricsService,
    PrismaService,
    MetricsRepository,
    GetSalesMetricsUseCase,
    GetOrderMetricsUseCase,
    GetGeneralMetricsUseCase,
  ],
  exports: [MetricsService],
})
export class MetricsModule {}
