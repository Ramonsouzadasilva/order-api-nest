import { Injectable } from '@nestjs/common';
import type { GeneralMetrics } from '../../repositories/metrics.repository.interface';
import { MetricsRepository } from '@/infrastructure/database/repositories/metrics.repository';

export interface GetGeneralMetricsUseCaseInput {
  startDate?: string;
  endDate?: string;
}

@Injectable()
export class GetGeneralMetricsUseCase {
  constructor(private readonly metricsRepository: MetricsRepository) {}

  async execute(input: GetGeneralMetricsUseCaseInput): Promise<GeneralMetrics> {
    const dateRange = {
      startDate: input.startDate ? new Date(input.startDate) : undefined,
      endDate: input.endDate ? new Date(input.endDate) : undefined,
    };

    return this.metricsRepository.getGeneralMetrics(dateRange);
  }
}
