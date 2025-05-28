"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExpensesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const redis_service_1 = require("../redis/redis.service");
let ExpensesService = class ExpensesService {
    constructor(prisma, redis) {
        this.prisma = prisma;
        this.redis = redis;
    }
    async create(createExpenseDto) {
        const expense = await this.prisma.expense.create({
            data: Object.assign(Object.assign({}, createExpenseDto), { date: new Date() }),
        });
        await this.invalidateCache();
        return expense;
    }
    async findAll(month, year, category) {
        const cacheKey = `expenses:${month}:${year}:${category}`;
        const cached = await this.redis.get(cacheKey);
        if (cached) {
            return JSON.parse(cached);
        }
        const where = {};
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
        await this.redis.set(cacheKey, JSON.stringify(expenses), 300);
        return expenses;
    }
    async findOne(id) {
        const expense = await this.prisma.expense.findUnique({
            where: { id },
        });
        if (!expense) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
        return expense;
    }
    async update(id, updateExpenseDto) {
        try {
            const expense = await this.prisma.expense.update({
                where: { id },
                data: updateExpenseDto,
            });
            await this.invalidateCache();
            return expense;
        }
        catch (error) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
    }
    async remove(id) {
        try {
            await this.prisma.expense.delete({
                where: { id },
            });
            await this.invalidateCache();
        }
        catch (error) {
            throw new common_1.NotFoundException(`Expense with ID ${id} not found`);
        }
    }
    async invalidateCache() {
        const keys = await this.redis.client.keys("expenses:*");
        if (keys.length > 0) {
            await Promise.all(keys.map((key) => this.redis.del(key)));
        }
    }
};
exports.ExpensesService = ExpensesService;
exports.ExpensesService = ExpensesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        redis_service_1.RedisService])
], ExpensesService);
//# sourceMappingURL=expenses.service.js.map