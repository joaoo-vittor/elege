import Sequelize, { Model } from 'sequelize';

export default class Eleicao extends Model {
  static init(sequelize) {
    super.init({
      nome: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          len: {
            args: [3, 30],
            msg: 'Nome precisa ter entre 3 e 30 caracters',
          }
        }
      },
      quantidade_candidatos: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: "A quantidade de candidatos precisa ser um numero inteiro"
          }
        }
      },
      descricao: {
        type: Sequelize.TEXT,
        defaultValue: '',
      },
      ativo: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      deletado: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      }
    }, {
      sequelize,
      modelName: 'Eleicao',
      tableName: 'eleicoes',
    })

    return this;
  }

  static associate(models) {
    this.belongsTo(models.User, { foreignKey: 'user_id' });
  }


  static associateTipoCandidato(models) {
    this.hasMany(models.TipoCandidato, { foreignKey: 'id_eleicao' });
  }

  static associateCandidato(models) {
    this.hasMany(models.Candidato, { foreignKey: 'id_eleicao' });
  }
}
