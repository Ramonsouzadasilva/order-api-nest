/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import {
  IMetricsRepository,
  DateRange,
  SalesMetrics,
  OrderMetrics,
  GeneralMetrics,
} from '../../../core/repositories/metrics.repository.interface';

@Injectable()
export class MetricsRepository implements IMetricsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async getSalesMetrics(dateRange: DateRange): Promise<SalesMetrics> {
    const whereClause = this.buildDateWhereClause(dateRange);

    // Total revenue and orders
    const totalStats = await this.prisma.order.aggregate({
      where: whereClause,
      _sum: { total: true },
      _count: { id: true },
      _avg: { total: true },
    });

    // Revenue by status
    const revenueByStatus = await this.prisma.order.groupBy({
      by: ['status'],
      where: whereClause,
      _sum: { total: true },
      _count: { id: true },
    });

    // Daily sales
    const dailySales = await this.prisma.$queryRaw<
      { date: string; revenue: number; orders: number }[]
    >`
      SELECT 
        DATE(created_at) as date,
        SUM(total)::float as revenue,
        COUNT(*)::int as orders
      FROM orders 
      WHERE ${whereClause.createdAt ? this.buildRawDateFilter(dateRange) : 'TRUE'}
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 30
    `;

    // Top products
    const topProducts = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      where: {
        order: whereClause,
      },
      _sum: { quantity: true, price: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 10,
    });

    const topProductsWithNames = await Promise.all(
      topProducts.map(async (item) => {
        const product = await this.prisma.product.findUnique({
          where: { id: item.productId },
          select: { name: true },
        });
        return {
          productId: item.productId,
          productName: product?.name || 'Unknown Product',
          totalSold: item._sum.quantity || 0,
          revenue: (item._sum.price || 0) * (item._sum.quantity || 0),
        };
      }),
    );

    return {
      totalRevenue: totalStats._sum.total || 0,
      totalOrders: totalStats._count.id || 0,
      averageOrderValue: totalStats._avg.total || 0,
      revenueByStatus: revenueByStatus.map((item) => ({
        status: item.status,
        revenue: item._sum.total || 0,
        count: item._count.id || 0,
      })),
      dailySales: dailySales.map((item) => ({
        date: item.date,
        revenue: Number(item.revenue),
        orders: Number(item.orders),
      })),
      topProducts: topProductsWithNames,
    };
  }

  async getOrderMetrics(dateRange: DateRange): Promise<OrderMetrics> {
    const whereClause = this.buildDateWhereClause(dateRange);

    // Total orders
    const totalOrders = await this.prisma.order.count({ where: whereClause });

    // Orders by status
    const ordersByStatus = await this.prisma.order.groupBy({
      by: ['status'],
      where: whereClause,
      _count: { id: true },
    });

    // Orders over time
    const ordersOverTime = await this.prisma.$queryRaw<
      { date: string; count: number }[]
    >`
      SELECT 
        DATE(created_at) as date,
        COUNT(*)::int as count
      FROM orders 
      WHERE ${whereClause.createdAt ? this.buildRawDateFilter(dateRange) : 'TRUE'}
      GROUP BY DATE(created_at)
      ORDER BY date DESC
      LIMIT 30
    `;

    // Average items per order
    const avgItemsResult = await this.prisma.orderItem.aggregate({
      where: { order: whereClause },
      _avg: { quantity: true },
    });

    // Order value distribution
    const orderValueDistribution = await this.prisma.$queryRaw<
      { range: string; count: number }[]
    >`
      SELECT 
        CASE 
          WHEN total < 50 THEN '$0-$49'
          WHEN total < 100 THEN '$50-$99'
          WHEN total < 200 THEN '$100-$199'
          WHEN total < 500 THEN '$200-$499'
          ELSE '$500+'
        END as range,
        COUNT(*)::int as count
      FROM orders 
      WHERE ${whereClause.createdAt ? this.buildRawDateFilter(dateRange) : 'TRUE'}
      GROUP BY range
      ORDER BY 
        CASE range
          WHEN '$0-$49' THEN 1
          WHEN '$50-$99' THEN 2
          WHEN '$100-$199' THEN 3
          WHEN '$200-$499' THEN 4
          WHEN '$500+' THEN 5
        END
    `;

    return {
      totalOrders,
      ordersByStatus: ordersByStatus.map((item) => ({
        status: item.status,
        count: item._count.id || 0,
        percentage:
          totalOrders > 0 ? ((item._count.id || 0) / totalOrders) * 100 : 0,
      })),
      ordersOverTime: ordersOverTime.map((item) => ({
        date: item.date,
        count: Number(item.count),
      })),
      averageItemsPerOrder: avgItemsResult._avg.quantity || 0,
      orderValueDistribution: orderValueDistribution.map((item) => ({
        range: item.range,
        count: Number(item.count),
      })),
    };
  }

  async getGeneralMetrics(dateRange: DateRange): Promise<GeneralMetrics> {
    const whereClause = this.buildDateWhereClause(dateRange);
    const thisMonth = new Date();
    thisMonth.setDate(1);
    thisMonth.setHours(0, 0, 0, 0);

    // Basic counts
    const [totalUsers, totalProducts, totalOrders, totalRevenueResult] =
      await Promise.all([
        this.prisma.user.count(),
        this.prisma.product.count(),
        this.prisma.order.count({ where: whereClause }),
        this.prisma.order.aggregate({
          where: whereClause,
          _sum: { total: true },
        }),
      ]);

    // This month metrics
    const [newUsersThisMonth, ordersThisMonth, revenueThisMonthResult] =
      await Promise.all([
        this.prisma.user.count({
          where: { createdAt: { gte: thisMonth } },
        }),
        this.prisma.order.count({
          where: { createdAt: { gte: thisMonth } },
        }),
        this.prisma.order.aggregate({
          where: { createdAt: { gte: thisMonth } },
          _sum: { total: true },
        }),
      ]);

    // Top customers
    const topCustomers = await this.prisma.order.groupBy({
      by: ['userId'],
      where: whereClause,
      _count: { id: true },
      _sum: { total: true },
      orderBy: { _sum: { total: 'desc' } },
      take: 10,
    });

    const topCustomersWithNames = await Promise.all(
      topCustomers.map(async (customer) => {
        const user = await this.prisma.user.findUnique({
          where: { id: customer.userId },
          select: { name: true },
        });
        return {
          userId: customer.userId,
          userName: user?.name || 'Unknown User',
          totalOrders: customer._count.id || 0,
          totalSpent: customer._sum.total || 0,
        };
      }),
    );

    // Low stock products
    const lowStockProducts = await this.prisma.product.findMany({
      where: { stock: { lte: 10 } },
      select: { id: true, name: true, stock: true },
      orderBy: { stock: 'asc' },
      take: 10,
    });

    return {
      totalUsers,
      totalProducts,
      totalOrders,
      totalRevenue: totalRevenueResult._sum.total || 0,
      newUsersThisMonth,
      ordersThisMonth,
      revenueThisMonth: revenueThisMonthResult._sum.total || 0,
      topCustomers: topCustomersWithNames,
      lowStockProducts: lowStockProducts.map((product) => ({
        productId: product.id,
        productName: product.name,
        currentStock: product.stock,
      })),
    };
  }

  private buildDateWhereClause(dateRange: DateRange) {
    const where: any = {};
    if (dateRange.startDate || dateRange.endDate) {
      where.createdAt = {};
      if (dateRange.startDate) {
        where.createdAt.gte = dateRange.startDate;
      }
      if (dateRange.endDate) {
        where.createdAt.lte = dateRange.endDate;
      }
    }
    return where;
  }

  private buildRawDateFilter(dateRange: DateRange): string {
    const conditions: string[] = [];
    if (dateRange.startDate) {
      conditions.push(`created_at >= '${dateRange.startDate.toISOString()}'`);
    }
    if (dateRange.endDate) {
      conditions.push(`created_at <= '${dateRange.endDate.toISOString()}'`);
    }
    return conditions.length > 0 ? conditions.join(' AND ') : 'TRUE';
  }
}
