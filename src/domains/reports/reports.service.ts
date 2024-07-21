import { Injectable } from '@nestjs/common';
import PdfPrinter from 'pdfmake';
import { TDocumentDefinitions } from 'pdfmake/interfaces';
import { fileToBase64 } from '../../utils/file-to-base64';
import { join } from 'path';
import { UsersService } from '../users';
import { FilterUsuarioDto } from '../shared';

@Injectable()
export class ReportsService {
  constructor(private readonly usersService: UsersService) {}

  async generatePDF(filters: FilterUsuarioDto): Promise<Buffer> {
    const users = await this.usersService.findAll(filters);
    const logoPath = join(process.cwd(), 'src', 'assets', 'logo.png');
    const logoBase64 = await fileToBase64(logoPath);

    const fonts = {
      Roboto: {
        normal: 'Helvetica',
        bold: 'Helvetica-Bold',
        italics: 'Helvetica-Oblique',
        bolditalics: 'Helvetica-BoldOblique',
      },
    };

    const printer = new PdfPrinter(fonts);

    const body = [
      [
        {
          text: 'Nombres',
          bold: true,
          alignment: 'center',
          style: 'tableHeader',
          margin: [0, 5],
        },
        {
          text: 'Apellidos',
          bold: true,
          alignment: 'center',
          style: 'tableHeader',
          margin: [0, 5],
        },
        {
          text: 'RUT',
          bold: true,
          alignment: 'center',
          style: 'tableHeader',
          margin: [0, 5],
        },
        {
          text: 'Cargo',
          bold: true,
          alignment: 'center',
          style: 'tableHeader',
          margin: [0, 5],
        },
        {
          text: 'Área',
          bold: true,
          alignment: 'center',
          style: 'tableHeader',
          margin: [0, 5],
        },
        {
          text: 'Teléfono',
          bold: true,
          alignment: 'center',
          style: 'tableHeader',
          margin: [0, 5],
        },
        {
          text: 'Fecha de Ingreso',
          bold: true,
          alignment: 'center',
          style: 'tableHeader',
          margin: [0, 5],
        },
      ],
    ];

    users.forEach((user) => {
      body.push([
        {
          text: capitalize(user.trabajador.nombres),
          style: 'tableContent',
          alignment: 'left',
          margin: [0, 3],
          bold: false,
        },
        {
          text: `${capitalize(user.trabajador.apellido_paterno)} ${capitalize(user.trabajador.apellido_materno)}`,
          style: 'tableContent',
          alignment: 'left',
          margin: [0, 3],
          bold: false,
        },
        {
          text: `${user.trabajador.rut.toString()}-${user.trabajador.dv}`,
          style: 'tableContent',
          alignment: 'center',
          margin: [0, 3],
          bold: false,
        },
        {
          text: capitalize(user.trabajador.datosLaborales.cargo.descripcion),
          style: 'tableContent',
          alignment: 'center',
          margin: [0, 3],
          bold: false,
        },
        {
          text: capitalize(user.trabajador.datosLaborales.area.descripcion),
          style: 'tableContent',
          alignment: 'center',
          margin: [0, 3],
          bold: false,
        },
        {
          text: user.trabajador.telefono.toString(),
          style: 'tableContent',
          alignment: 'center',
          margin: [0, 3],
          bold: false,
        },
        {
          text: formatDate(
            new Date(user.trabajador.datosLaborales.fecha_ingreso),
          ),
          style: 'tableContent',
          alignment: 'center',
          margin: [0, 3],
          bold: false,
        },
      ]);
    });

    const docDefinition: TDocumentDefinitions = {
      pageSize: 'LETTER',
      pageOrientation: 'landscape',
      header: {
        margin: [40, 20, 40, 40], // Left, Top, Right, Bottom
        columns: [
          {
            image: 'data:image/png;base64,' + logoBase64,
            width: 220,
            alignment: 'center',
          },
        ],
      },
      footer: (currentPage, pageCount) => {
        return {
          columns: [
            {
              text: `Fecha de emisión: ${new Date().toLocaleDateString()}`,
              alignment: 'left',
              margin: [40, 0],
              style: 'footer',
            },
            {
              text: 'Avenida Luis Durand 02150, Temuco\n Teléfono: +56 9 5148 6273',
              alignment: 'center',
              style: 'footer',
            },
            {
              text: `Página ${currentPage} de ${pageCount}`,
              alignment: 'right',
              margin: [0, 0, 40, 0],
              style: 'footer',
            },
          ],
        };
      },
      content: [
        {
          text: 'Reporte de Trabajadores',
          style: 'header',
          margin: [0, 50, 0, 30],
        },
        {
          table: {
            widths: ['*', '*', '*', '*', '*', '*', '*'],
            body: body,
            headerRows: 1,
            heights: 20,
          },
        },
      ],
      styles: {
        header: {
          fontSize: 17,
          bold: true,
          alignment: 'center',
        },
        tableHeader: {
          fontSize: 11,
          bold: true,
        },
        tableContent: {
          fontSize: 10,
          alignment: 'center',
        },
        footer: {
          fontSize: 8,
        },
      },
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

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
