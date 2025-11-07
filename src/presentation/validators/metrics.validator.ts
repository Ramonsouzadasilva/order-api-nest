import { z } from 'zod';

export const metricsQuerySchema = z.object({
  startDate: z
    .string()
    .datetime('Start date must be a valid ISO date string')
    .optional()
    .transform((val) => (val ? new Date(val).toISOString() : undefined)),
  endDate: z
    .string()
    .datetime('End date must be a valid ISO date string')
    .optional()
    .transform((val) => (val ? new Date(val).toISOString() : undefined)),
});

export type MetricsQueryInput = z.infer<typeof metricsQuerySchema>;
