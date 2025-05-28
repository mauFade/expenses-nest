import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RedisService } from "../redis/redis.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";

@Injectable()
export class ExpensesService {
  constructor(
    private prisma: PrismaService,
    private redis: RedisService
  ) {}

  async create(createExpenseDto: CreateExpenseDto) {
    const expense = await this.prisma.expense.create({
      data: {
        ...createExpenseDto,
        date: new Date(),
      },
    });
    await this.invalidateCache();
    return expense;
  }

  async findAll(month?: string, year?: string, category?: string) {
    const cacheKey = `expenses:${month}:${year}:${category}`;
    const cached = await this.redis.get(cacheKey);

    if (cached) {
      return JSON.parse(cached);
    }

    const where: any = {};

    if (month && year) {
      const startDate = new Date(parseInt(year), parseInt(month) - 1, 1);
      const endDate = new Date(parseInt(year), parseInt(month), 0);
      where.date = {
        gte: startDate,
        lte: endDate,
      };
    }

    if (category) {
      where.category = category;
    }

    const expenses = await this.prisma.expense.findMany({
      where,
      orderBy: { date: "desc" },
    });

    await this.redis.set(cacheKey, JSON.stringify(expenses), 300); // Cache for 5 minutes
    return expenses;
  }

  async findOne(id: string) {
    const expense = await this.prisma.expense.findUnique({
      where: { id },
    });

    if (!expense) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }

    return expense;
  }

  async update(id: string, updateExpenseDto: UpdateExpenseDto) {
    try {
      const expense = await this.prisma.expense.update({
        where: { id },
        data: updateExpenseDto,
      });
      await this.invalidateCache();
      return expense;
    } catch (error) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
  }

  async remove(id: string) {
    try {
      await this.prisma.expense.delete({
        where: { id },
      });
      await this.invalidateCache();
    } catch (error) {
      throw new NotFoundException(`Expense with ID ${id} not found`);
    }
  }

  private async invalidateCache() {
    const keys = await this.redis.client.keys("expenses:*");
    if (keys.length > 0) {
      await Promise.all(keys.map((key) => this.redis.del(key)));
    }
  }
}
