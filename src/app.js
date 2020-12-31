import dotenv from 'dotenv';
dotenv.config();

import './database';

import express from 'express';
import { resolve } from 'path';


import homeRoutes from './routes/homeRoute';
import cadastroRouter from './routes/cadastroRouter';
import tokenRouter from './routes/tokenRouter';
import criarEleicaoRouter from './routes/criarEleicaoRouter';
import candidatoRouter from './routes/criarCandidato';


class App {
  constructor() {
    this.app = express();
    this.middlewares();
    this.routes();
  }

  middlewares() {
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(express.json());
  }

  routes() {
    this.app.use('/', homeRoutes);
    this.app.use('/cadastro/', cadastroRouter);
    this.app.use('/token/', tokenRouter);
    this.app.use('/eleicao/', criarEleicaoRouter);
    this.app.use('/candidato/', candidatoRouter);
  }
}

export default new App().app;
