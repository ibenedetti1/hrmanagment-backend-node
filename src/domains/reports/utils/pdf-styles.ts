import { StyleDictionary } from 'pdfmake/interfaces';

export const pdfStyles: StyleDictionary = {
  header: {
    fontSize: 17,
    bold: true,
    alignment: 'center' as const,
  },
  tableHeader: {
    fontSize: 11,
    bold: true,
    alignment: 'center' as const,
    margin: [0, 5],
  },
  tableContent: {
    fontSize: 10,
    alignment: 'center' as const,
    margin: [0, 3],
    bold: false,
  },
  footer: {
    fontSize: 8,
  },
};
