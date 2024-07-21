import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { UsersService } from '../users';
import { FilterUsuarioDto } from '../shared';
import { pdfStyles } from './utils/pdf-styles';
import { getPdfContent } from './utils/pdf-content';
import { fileToBase64 } from './utils/file-to-base64'; // Añadir esta línea
import { join } from 'path';

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

  async generateCertificadoAntiguedad(rut: number): Promise<Buffer> {
    const user = await this.usersService.findOne(rut);
    if (!user) {
      throw new Error('Usuario no encontrado');
    }

    const logoPath = join(process.cwd(), 'src', 'assets', 'logo.png');
    const logoBase64 = await fileToBase64(logoPath);

    const firmaPath = join(process.cwd(), 'src', 'assets', 'sign.png');
    const firmaBase64 = await fileToBase64(firmaPath);

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
      pageSize: 'LETTER',
      pageMargins: [40, 60, 40, 60],
      content: [
        {
          image: 'data:image/png;base64,' + logoBase64,
          width: 150,
          alignment: 'left',
          margin: [0, 0, 0, 20],
        },
        {
          text: 'CERTIFICADO DE ANTIGUEDAD',
          style: 'header',
          alignment: 'center',
          margin: [0, 20, 0, 20],
        },
        {
          text: `ITALLO BENEDETTI GÓMEZ, Jefe dpto. de Gestion y Desarrollo de Personas, certifica que ${toUpperCase(user.trabajador.nombres)} ${toUpperCase(user.trabajador.apellido_paterno)} ${toUpperCase(user.trabajador.apellido_materno)}, Rut ${user.trabajador.rut}-${user.trabajador.dv}, cargo ${toUpperCase(user.trabajador.datosLaborales.cargo.descripcion)}, del departamento de ${toUpperCase(user.trabajador.datosLaborales.area.descripcion)}, actualmente se desempeña en la empresa EL CORREO DE YURI. Ingresó con fecha ${formatDate(new Date(user.trabajador.datosLaborales.fecha_ingreso))} y se mantiene en funciones actualmente.\n\n Se extiende el presente certificado, para los fines que el interesado estime conveniente.`,
          style: 'content',
          alignment: 'justify',
          margin: [0, 20, 0, 20],
          lineHeight: 1.5,
        },
        {
          image: 'data:image/png;base64,' + firmaBase64,
          width: 80,
          alignment: 'center',
          margin: [0, 20, 0, 0],
        },
        {
          text: 'Firma Habilitado\nJEFE DEPTO. DE GESTION Y DESARROLLO DE PERSONAS',
          style: 'content',
          alignment: 'center',
          margin: [0, 0, 0, 20],
          lineHeight: 1.5,
        },
      ],
      footer: (currentPage, pageCount) => {
        return {
          columns: [
            {
              text: `Código de Verificación: ${generateVerificationCode()}`,
              alignment: 'left',
              margin: [40, 0],
              style: 'footer',
            },
            {
              text: `Fecha de emisión: ${formatDate(new Date())}`,
              alignment: 'right',
              margin: [0, 0, 40, 0],
              style: 'footer',
            },
          ],
        };
      },
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

function toUpperCase(text: string): string {
  return text.toUpperCase();
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

function generateVerificationCode(): string {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < 10; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
