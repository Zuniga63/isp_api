import { Module } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { StatisticsController } from './statistics.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CashboxTransaction, CashboxTransactionSchema } from '../cashboxes/schemas/cashbox-transaction.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: CashboxTransaction.name, schema: CashboxTransactionSchema }])],
  controllers: [StatisticsController],
  providers: [StatisticsService],
})
export class StatisticsModule {}
