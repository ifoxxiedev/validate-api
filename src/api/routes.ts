import express from 'express';
import { handleError } from '@ifexcorp/rest-express-utils';
import pessoaRouter from './pessoa-routes';

export const setupRoutes = (app: express.Application) => {
  app.use('/api/v1/pessoas', pessoaRouter)
  app.use(handleError)
}