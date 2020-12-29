import Sequelize, { Model } from 'sequelize';

export default class TipoCandidato extends Model {
  static init(sequelize) {
    super.init({
      tipo: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isIn: {
            args: [['individual', 'chapa']],
            msg: 'Tipo do candidato precisa ser "individual" ou "chapa"',
          }
        }
      },
      id_user: {
        type: Sequelize.INTEGER,
        defaultValue: '',
        validate: {
          isInt: {
            msg: "Id de usuario precisa ser um inteiro"
          }
        }
      },
    }, {
      sequelize,
      tableName: 'tipo_candidato',
    })

    return this;
  }

  static associateTipoCandidato(models) {
    this.belongsTo(models.Eleicao, { foreignKey: 'id_eleicao' });
  }
}
