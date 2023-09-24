import dayjs from 'dayjs';
import { CashFlowReportDto } from 'src/modules/statistics/dto/cash-flow-report.dto';
import type { CreateCashFlowReportsProps } from 'src/types';

/**
 * Organiza los ingresos y egresos de las transacciones mensualmente.
 * @param props Parametros
 * @returns Arreglo con los flujos de reportes que se envían al front
 */
export function createCashFlowReports(props: CreateCashFlowReportsProps): CashFlowReportDto[] {
  const { transactions, startDate, endDate, initialBalance = 0 } = props;
  const result: CashFlowReportDto[] = [];
  let startMonth = dayjs(startDate).startOf('month');
  let balance = initialBalance;
  let lastTransactionIndex = 0;

  while (startMonth.isBefore(endDate)) {
    const endMonth = startMonth.endOf('month');
    const report = {
      year: startMonth.year(),
      month: startMonth.month(),
      incomes: 0,
      expenses: 0,
    };

    // Get the monthly transactions
    for (let index = lastTransactionIndex; index < transactions.length; index++) {
      const { transactionDate, amount } = transactions[index];
      const date = dayjs(transactionDate);
      lastTransactionIndex = index;

      if (date.isAfter(endMonth)) break;
      if (!date.isBetween(startMonth, endMonth, 'day', '[]')) continue;

      balance += amount;
      if (amount > 0) report.incomes += amount;
      else report.expenses += amount * -1;
    }

    result.push({
      id: startMonth.format('MM/YYYY'),
      ...report,
      balance,
    });

    startMonth = startMonth.add(1, 'month');
  }

  return result;
}
