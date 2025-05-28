import { PrismaService } from "../prisma/prisma.service";
import { RedisService } from "../redis/redis.service";
import { CreateExpenseDto } from "./dto/create-expense.dto";
import { UpdateExpenseDto } from "./dto/update-expense.dto";
export declare class ExpensesService {
    private prisma;
    private redis;
    constructor(prisma: PrismaService, redis: RedisService);
    create(createExpenseDto: CreateExpenseDto): Promise<{
        id: string;
        title: string;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(month?: string, year?: string, category?: string): Promise<any>;
    findOne(id: string): Promise<{
        id: string;
        title: string;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateExpenseDto: UpdateExpenseDto): Promise<{
        id: string;
        title: string;
        amount: number;
        category: string;
        date: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<void>;
    private invalidateCache;
}
