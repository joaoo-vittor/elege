import dotenv from 'dotenv';
dotenv.config();

import './database';

import express from 'express';
import { resolve } from 'path';


import homeRoutes from './routes/homeRoute';
import cadastroRoutes from './routes/cadastroRouter';
import tokenRouter from './routes/tokenRouter';
import criarEleicaoRouter from './routes/criarEleicaoRouter';


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
    this.app.use('/cadastro/', cadastroRoutes);
    this.app.use('/token/', tokenRouter);
    this.app.use('/criar-eleicao/', criarEleicaoRouter);
  }
}

export default new App().app;
