export const getTableBody = (users: any[]) => {
  const body = [
    [
      { text: '#', style: 'tableHeader' },
      { text: 'Nombres', style: 'tableHeader' },
      { text: 'Apellidos', style: 'tableHeader' },
      { text: 'RUT', style: 'tableHeader' },
      { text: 'Cargo', style: 'tableHeader' },
      { text: 'Área', style: 'tableHeader' },
      { text: 'Teléfono', style: 'tableHeader' },
      { text: 'Fecha de Ingreso', style: 'tableHeader' },
    ],
  ];

  users.forEach((user, index) => {
    body.push([
      {
        text: (index + 1).toString(),
        style: 'tableContent',
      },
      {
        text: capitalize(user.trabajador.nombres),
        style: 'tableContent',
      },
      {
        text: `${capitalize(user.trabajador.apellido_paterno)} ${capitalize(user.trabajador.apellido_materno)}`,
        style: 'tableContent',
      },
      {
        text: `${user.trabajador.rut.toString()}-${user.trabajador.dv}`,
        style: 'tableContent',
      },
      {
        text: capitalize(user.trabajador.datosLaborales.cargo.descripcion),
        style: 'tableContent',
      },
      {
        text: capitalize(user.trabajador.datosLaborales.area.descripcion),
        style: 'tableContent',
      },
      {
        text: user.trabajador.telefono.toString(),
        style: 'tableContent',
      },
      {
        text: formatDate(
          new Date(user.trabajador.datosLaborales.fecha_ingreso),
        ),
        style: 'tableContent',
      },
    ]);
  });

  return body;
};

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

function formatDate(date: Date): string {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
