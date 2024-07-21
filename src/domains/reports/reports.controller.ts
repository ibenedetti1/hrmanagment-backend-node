import { Controller, Get, Query, Res } from '@nestjs/common';
import { Response } from 'express';
import { ReportsService } from './reports.service';

import { Readable } from 'stream';
import { FilterUsuarioDto } from '../shared';

@Controller('reports')
export class ReportsController {
  constructor(private readonly reportsService: ReportsService) {}

  @Get('pdf')
  async exportPdf(
    @Query() filters: FilterUsuarioDto,
    @Res() res: Response,
  ): Promise<void> {
    const pdfBuffer = await this.reportsService.generatePDF(filters);
    const stream = new Readable();
    stream.push(pdfBuffer);
    stream.push(null);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'attachment; filename=report.pdf');
    res.setHeader('Content-Length', pdfBuffer.length.toString());

    stream.pipe(res);
  }
}
