import { getTableBody } from './pdf-table-config';

import { join } from 'path';
import { Content, TDocumentDefinitions } from 'pdfmake/interfaces';
import { fileToBase64 } from './file-to-base64';

export const getPdfContent = async (
  users: any[],
): Promise<TDocumentDefinitions> => {
  const logoPath = join(process.cwd(), 'src', 'assets', 'logo.png');
  const logoBase64 = await fileToBase64(logoPath);

  const tableBody = getTableBody(users);

  const content: Content[] = [
    {
      text: 'Reporte de Trabajadores',
      style: 'header',
      margin: [0, 50, 0, 30],
    },
    {
      table: {
        widths: ['auto', '*', '*', '*', '*', '*', '*', '*'],
        body: tableBody,
        headerRows: 1,
        dontBreakRows: true,
        heights: 15,
      },
      layout: {
        hLineWidth: function (i, node) {
          return i === 0 || i === node.table.body.length ? 2 : 1;
        },
        vLineWidth: function (i) {
          return 1;
        },
        hLineColor: function (i) {
          return '#aaa';
        },
        paddingLeft: function (i) {
          return i === 0 ? 0 : 8;
        },
        paddingRight: function (i, node) {
          return i === node.table.widths.length - 1 ? 0 : 8;
        },
        paddingTop: function () {
          return 4;
        },
        paddingBottom: function () {
          return 4;
        },
      },
    },
  ];

  return {
    pageSize: 'LETTER',
    pageOrientation: 'landscape',
    pageMargins: [40, 60, 40, 60],
    header: (currentPage, pageCount, pageSize) => {
      return currentPage === 1
        ? {
            margin: [40, 20, 40, 40],
            columns: [
              {
                image: 'data:image/png;base64,' + logoBase64,
                width: 220,
                alignment: 'center',
              },
            ],
          }
        : {
            margin: [40, 20, 40, 40],
            columns: [
              {
                text: '',
              },
            ],
          };
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
    content: content,
  };
};
