export interface DateRange {
  startDate?: Date;
  endDate?: Date;
}

export interface SalesMetrics {
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

export interface OrderMetrics {
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

export interface GeneralMetrics {
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

export interface IMetricsRepository {
  getSalesMetrics(dateRange: DateRange): Promise<SalesMetrics>;
  getOrderMetrics(dateRange: DateRange): Promise<OrderMetrics>;
  getGeneralMetrics(dateRange: DateRange): Promise<GeneralMetrics>;
}
