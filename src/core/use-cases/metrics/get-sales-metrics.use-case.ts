import { Injectable } from '@nestjs/common';
import type { SalesMetrics } from '../../repositories/metrics.repository.interface';
import { MetricsRepository } from '@/infrastructure/database/repositories/metrics.repository';

export interface GetSalesMetricsUseCaseInput {
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class GetSalesMetricsUseCase {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async execute(input: GetSalesMetricsUseCaseInput): Promise<SalesMetrics> {
    const dateRange = {
      startDate: input.startDate ? new Date(input.startDate) : undefined,
      endDate: input.endDate ? new Date(input.endDate) : undefined,
    };

    return this.metricsRepository.getSalesMetrics(dateRange);
  }
}
