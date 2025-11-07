import { Injectable } from '@nestjs/common';
import { GetSalesMetricsUseCase } from '../../core/use-cases/metrics/get-sales-metrics.use-case';
import { GetOrderMetricsUseCase } from '../../core/use-cases/metrics/get-order-metrics.use-case';
import { GetGeneralMetricsUseCase } from '../../core/use-cases/metrics/get-general-metrics.use-case';
import { MetricsQueryDto } from '../../presentation/dtos/metrics.dto';

@Injectable()
export class MetricsService {
  constructor(
    private readonly getSalesMetricsUseCase: GetSalesMetricsUseCase,
    private readonly getOrderMetricsUseCase: GetOrderMetricsUseCase,
    private readonly getGeneralMetricsUseCase: GetGeneralMetricsUseCase,
  ) {}

  async getSalesMetrics(query: MetricsQueryDto) {
    return this.getSalesMetricsUseCase.execute(query);
  }

  async getOrderMetrics(query: MetricsQueryDto) {
    return this.getOrderMetricsUseCase.execute(query);
  }

  async getGeneralMetrics(query: MetricsQueryDto) {
    return this.getGeneralMetricsUseCase.execute(query);
  }
}
