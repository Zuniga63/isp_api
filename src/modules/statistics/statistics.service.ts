import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { CashboxTransaction, CashboxTransactionDocument } from '../cashboxes/schemas/cashbox-transaction.schema';
import { Model } from 'mongoose';
import dayjs from 'dayjs';
import { createCashFlowReports } from 'src/logic/statistics';

@Injectable()
export class StatisticsService {
  constructor(
    @InjectModel(CashboxTransaction.name)
    private transactionModel: Model<CashboxTransactionDocument>,
  ) {}

  async getCashFlowReports() {
    const startDate = dayjs().subtract(1, 'year').startOf('month').toDate();
    const today = dayjs().toDate();

    const [initialBalance, transactions] = await Promise.all([
      // BALANCE QUERY
      this.transactionModel
        .aggregate<{ _id: null; value: number }>()
        .match({ transactionDate: { $lt: startDate } })
        .group({
          _id: null,
          value: { $sum: '$amount' },
        }),
      // TRANSACTIONS QUERY
      this.transactionModel
        .find({ isTransfer: null, transactionDate: { $gte: startDate, $lte: today } })
        .sort('transactionDate')
        .select('transactionDate amount'),
    ]);

    const [balance] = initialBalance;

    return createCashFlowReports({ transactions, startDate, endDate: today, initialBalance: balance?.value });
  }
}
