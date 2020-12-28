import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

export default class User extends Model {
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
      email: {
        type: Sequelize.STRING,
        defaultValue: '',
        validate: {
          isEmail: {
            msg: 'Email é invalido',
          },
          isUnique(valor, next) {
            User.findOne({ where: { email: valor }})
              .then(user => {
                if(user) {
                  return next('Email já cadastrado');
                }
                return next();
              })
              .catch(err => next(err));
          }
        }
      },
      senha_hash: {
        type: Sequelize.STRING,
        defaultValue: '',
      },
      tipo: {
        type: Sequelize.STRING,
        defaultValue: 'cli',
      },
      deletado: {
        type: Sequelize.INTEGER,
        defaultValue: 0,
      },
      senha: {
        type: Sequelize.VIRTUAL,
        defaultValue: '',
        validate: {
          len: {
            args: [6, 50],
            msg: 'Senha deve ter entre 6 e 50 caracteres',
          }
        }
      }
    },{
      sequelize
    });

    this.addHook('beforeSave', async user => {
      if(user.senha) {
        user.senha_hash = await bcrypt.hash(user.senha, 8);
      }
    })

    return this;
  }

  senhaValida(senha) {
    return bcrypt.compare(senha, this.senha_hash);
  }

  static associate(model) {
    this.hasMany(model.Eleicao, { foreignKey: 'user_id' })
  }

}



