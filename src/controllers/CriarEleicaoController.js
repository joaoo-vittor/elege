import jwt from 'jsonwebtoken';

import Eleicao from '../models/Eleicoes';

class CriarEleicaoController {
  async store(req, res) {
    const { authorization } = req.headers;
    const [bearer, token] = authorization.split(' ');
    const { nome,
            tipos_candidato,
            quantidade_candidatos,
            descricao,
            ativo
    } = req.body;

    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);

    const objEleicao = {
      nome: nome,
      quantidade_candidatos: quantidade_candidatos,
      descricao: descricao,
      user_id: id,
      ativo: ativo,
    };

    try {
      const novaEleicao = await Eleicao.create(objEleicao);

      res.json(novaEleicao);
    } catch(err) {
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }
  }

  async index(req, res) {
    try {
      const eleicoes = await Eleicao.findAll();
      return res.json(eleicoes);
    } catch(err) {
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }
  }

  async show(req, res) {
    const { id } = req.params;

    try {
      const eleicao = await Eleicao.findByPk(id);

      if (eleicao === null) {
        return res.status(404).json({
          msg: 'Dado não encontrado'
        })
      }

      return res.json(eleicao);
    } catch(err) {
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }
  }
}

export default new CriarEleicaoController();
