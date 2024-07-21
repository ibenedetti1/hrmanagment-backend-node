import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { UsersService } from '../users';
import { FilterUsuarioDto } from '../shared';
import { pdfStyles } from './utils/pdf-styles';
import { getPdfContent } from './utils/pdf-content';

@Injectable()
export class ReportsService {
  constructor(private readonly usersService: UsersService) {}

  async generatePDF(filters: FilterUsuarioDto): Promise<Buffer> {
    const users = await this.usersService.findAll(filters);

    const fonts = {
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };

    const printer = new PdfPrinter(fonts);

    const docDefinition: TDocumentDefinitions = {
      ...(await getPdfContent(users)),
      styles: pdfStyles,
    };

    const pdfDoc = printer.createPdfKitDocument(docDefinition);
    const chunks: any[] = [];

    return new Promise<Buffer>((resolve, reject) => {
      pdfDoc.on('data', (chunk) => chunks.push(chunk));
      pdfDoc.on('end', () => resolve(Buffer.concat(chunks)));
      pdfDoc.on('error', reject);
      pdfDoc.end();
    });
  }
}
