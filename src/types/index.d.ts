import { CashboxTransactionDocument } from 'src/modules/cashboxes/schemas/cashbox-transaction.schema';

export interface IImage {
  publicId: string;
  width: number;
  height: number;
  format: string;
  type: string;
  url: string;
}

export type CreateCashFlowReportsProps = {
  /**
   * Las transacciones que pertenecen al rango de fechas para sacar los reportes, requiere transactionDate and amount
   */
  transactions: CashboxTransactionDocument[];
  /**
   * Es la fecha en la que se empieza a generar el reporte
   */
  startDate: Date;
  /**
   * Es el mes en el que se detiene el reporte
   */
  endDate: Date;
  /**
   * Parametro opcional para otorgarle un saldo inicial a los reportes, por defecto es cero
   */
  initialBalance?: number;
};
