import { ApiProperty } from '@nestjs/swagger';

export class CashFlowReportDto {
  @ApiProperty({ example: '2023/1' })
  id: string;

  @ApiProperty({ example: 2023 })
  year: number;

  @ApiProperty({ example: 1, description: 'The valu from 1 to 12' })
  month: number;

  @ApiProperty({ example: 100000 })
  incomes: number;

  @ApiProperty({ example: 70000 })
  expenses: number;

  @ApiProperty({ example: 30000 })
  balance: number;
}
