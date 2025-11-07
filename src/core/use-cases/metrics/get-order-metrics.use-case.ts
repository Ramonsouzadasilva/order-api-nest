import { Injectable } from '@nestjs/common';
import type { OrderMetrics } from '../../repositories/metrics.repository.interface';
import { MetricsRepository } from '@/infrastructure/database/repositories/metrics.repository';

export interface GetOrderMetricsUseCaseInput {
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class GetOrderMetricsUseCase {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async execute(input: GetOrderMetricsUseCaseInput): Promise<OrderMetrics> {
    const dateRange = {
      startDate: input.startDate ? new Date(input.startDate) : undefined,
      endDate: input.endDate ? new Date(input.endDate) : undefined,
    };

    return this.metricsRepository.getOrderMetrics(dateRange);
  }
}
