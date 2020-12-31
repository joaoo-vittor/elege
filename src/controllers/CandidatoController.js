import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import Candidato from '../models/Candidato';
import Eleicao from '../models/Eleicoes';

class CandidatoController {
  async index(req, res) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(' ');
      const dataToken = jwt.verify(token, process.env.TOKEN_SECRET);

      const candidatos = await Candidato.findAll({ where: {
        id_user: dataToken.id
      }});

      return res.json(candidatos);
    } catch(err) {
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      });
    }
  }

  async store(req, res) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(' ');
      const dataToken = jwt.verify(token, process.env.TOKEN_SECRET);

      const idEleicao = Number(req.params.id);
      req.body.id_user = dataToken.id;
      req.body.id_eleicao = idEleicao;

      const eleicao = await Eleicao.findByPk(idEleicao);

      if (eleicao.deletado) {
        return res.json({ errors: 'Está eleicao foi deletada' });
      }

      if (eleicao.user_id !== dataToken.id) {
        return res.json({ errors: 'credenciais invalidas' });
      }

      if (eleicao.ativo) {
        return res.json({ errors: 'Esta eleicao esta em andamento' });
      }

      const numero = req.body.numero;
      const numeroCandidato = await Candidato.findOne({
        where: {
          [Op.and] : [
            { id_eleicao: idEleicao },
            { numero: numero }
          ]
        }
      });

      if (!numeroCandidato) {
        const novoCandidato = await Candidato.create(req.body);
        return res.json(novoCandidato);
      }

      return res.json({ errors: 'Já existe candidato com esse numero' })
    } catch(err) {
      return res.status(400).json(err);
    }
  }

  async update(req, res) {
    return res.json('update');
  }
}

export default new CandidatoController();
