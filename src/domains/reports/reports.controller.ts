import { Controller, Get, Query, Res, Param } from '@nestjs/common';
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

  @Get('certificado/:rut')
  async exportCertificado(
    @Param('rut') rut: number,
    @Res() res: Response,
  ): Promise<void> {
    const pdfBuffer =
      await this.reportsService.generateCertificadoAntiguedad(rut);
    const stream = new Readable();
    stream.push(pdfBuffer);
    stream.push(null);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader(
      'Content-Disposition',
      'attachment; filename=certificado_antiguedad.pdf',
    );
    res.setHeader('Content-Length', pdfBuffer.length.toString());

    stream.pipe(res);
  }
}
