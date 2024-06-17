export interface IDataResponse {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  rut: number;
  dv: string;
}

export interface ICreateUserResponse {
  message: string;
  data: IDataResponse;
}
