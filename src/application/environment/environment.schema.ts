import * as Joi from 'joi';

import { Environment } from './environment.type';

export const environmentSchema = Joi.object<Environment, true>({
  NODE_ENV: Joi.string().valid('local', 'dev', 'prod').default('local'),
  PORT: Joi.number().default(3000),
  SQL_HOST: Joi.string().required(),
  SQL_PORT: Joi.number().required(),
  SQL_USER: Joi.string().required(),
  SQL_PASSWORD: Joi.string().required(),
  SQL_DATABASE: Joi.string().required(),
});
