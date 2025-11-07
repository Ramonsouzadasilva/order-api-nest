import { IsOptional, IsDateString } from 'class-validator';

export class MetricsQueryDto {
  @IsOptional()
  @IsDateString({}, { message: 'Start date must be a valid ISO date string' })
  startDate?: string;

  @IsOptional()
  @IsDateString({}, { message: 'End date must be a valid ISO date string' })
  endDate?: string;
}

export class SalesMetricsResponseDto {
  totalRevenue: number;
  totalOrders: number;
  averageOrderValue: number;
  revenueByStatus: {
    status: string;
    revenue: number;
    count: number;
  }[];
  dailySales: {
    date: string;
    revenue: number;
    orders: number;
  }[];
  topProducts: {
    productId: string;
    productName: string;
    totalSold: number;
    revenue: number;
  }[];
}

export class OrderMetricsResponseDto {
  totalOrders: number;
  ordersByStatus: {
    status: string;
    count: number;
    percentage: number;
  }[];
  ordersOverTime: {
    date: string;
    count: number;
  }[];
  averageItemsPerOrder: number;
  orderValueDistribution: {
    range: string;
    count: number;
  }[];
}

export class GeneralMetricsResponseDto {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: number;
  newUsersThisMonth: number;
  ordersThisMonth: number;
  revenueThisMonth: number;
  topCustomers: {
    userId: string;
    userName: string;
    totalOrders: number;
    totalSpent: number;
  }[];
  lowStockProducts: {
    productId: string;
    productName: string;
    currentStock: number;
  }[];
}
