import Sequelize from 'sequelize';
import databaseConfig from '../config/database';


import Cadastro from '../models/Cadastro';
import Eleicao from '../models/Eleicoes';
import TipoCandidato from '../models/TipoCandidato';
import Candidato from '../models/Candidato';


const models = [ Cadastro, Eleicao, TipoCandidato, Candidato ];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => (
  model.associate
  && model.associate(connection.models)));

models.forEach((model) => (
  model.associateTipoCandidato
  && model.associateTipoCandidato(connection.models)));

models.forEach((model) => (
  model.associateCandidato
  && model.associateCandidato(connection.models)));
