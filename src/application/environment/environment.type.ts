export class Environment {
  NODE_ENV: 'local' | 'dev' | 'prod';
  PORT: number;
  SQL_HOST: string;
  SQL_PORT: number;
  SQL_USER: string;
  SQL_PASSWORD: string;
  SQL_DATABASE: string;
}
