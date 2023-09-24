import { Controller, Get, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { StatisticsService } from './statistics.service';
import { ApiBearerAuth, ApiForbiddenResponse, ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { PermissionsGuards } from '../auth/guards/permissions.guard';
import { RequirePermissions } from '../auth/decorators/required-permissions.decorator';
import { Permission } from '../auth/permission.enum';
import { Request } from 'express';
import { CashFlowReportDto } from './dto/cash-flow-report.dto';

@Controller('statistics')
@UseGuards(JwtAuthGuard, PermissionsGuards)
@ApiTags('Statistics')
@ApiBearerAuth()
@ApiForbiddenResponse({
  description: 'Only user with the permissions can acces to this end points.',
})
export class StatisticsController {
  constructor(private readonly statisticsService: StatisticsService) {}

  // ------------------------------------------------------------------------------------
  // GET CASHFLOW
  // ------------------------------------------------------------------------------------
  @Get('/cash-flow-reports')
  @RequirePermissions(Permission.GET_CASH_FLOW)
  @ApiOperation({
    summary: 'Get Annual report of cash flow',
    description: 'This end point return a report of incomes and expenses of last 12 months',
  })
  @ApiOkResponse({ description: 'Ok', type: [CashFlowReportDto] })
  cashFlowReports(@Req() req: Request) {
    if (!req.user) throw new UnauthorizedException();
    return this.statisticsService.getCashFlowReports();
  }
}
