import { Module } from '@nestjs/common';
import { ExpensesModule } from './expenses/expenses.module';
import { PrismaService } from './prisma/prisma.service';
import { RedisModule } from './redis/redis.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ExpensesModule,
    RedisModule,
    AuthModule,
  ],
  providers: [PrismaService],
})
export class AppModule {} 