import Sequelize, { Model } from 'sequelize';

export default class Candidato extends Model {
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
      nome_vice: {
        type: Sequelize.STRING,
        defaultValue: null,
        validate: {
          len: {
            args: [3, 30],
            msg: "A quantidade de candidatos precisa ser um numero inteiro"
          }
        }
      },
      tipo: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isIn: {
            args: [['chapa', 'individual']],
            msg: 'O tipo do candidato deve ser do tipo "chapa" ou "individual"',
          }
        }
      },
      numero: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      id_user: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      deletado: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      id_eleicao: {
        type: Sequelize.INTEGER,
        defaultValue: null,
      },
    }, {
      sequelize,
      modelName: 'Candidato',
      tableName: 'candidato',
    })

    return this;
  }

  static associateCandidato(models) {
    this.belongsTo(models.Eleicao, { foreignKey: 'id_eleicao' });
  }
}
