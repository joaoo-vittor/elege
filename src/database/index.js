import Sequelize from 'sequelize';
import databaseConfig from '../config/database';


import Cadastro from '../models/Cadastro';
import Eleicao from '../models/Eleicoes';


const models = [ Cadastro, Eleicao ];

const connection = new Sequelize(databaseConfig);

models.forEach((model) => model.init(connection));

models.forEach((model) => model.associate && model.associate(connection.models));
