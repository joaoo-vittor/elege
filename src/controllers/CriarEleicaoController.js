import jwt from 'jsonwebtoken';
import { Op } from 'sequelize';

import Eleicao from '../models/Eleicoes';
import TipoCandidato from '../models/TipoCandidato';

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

      try {
        let novoTipoCand;
        let arrTipoCand = [];
        for (let tipoCand of tipos_candidato) {
          tipoCand = tipoCand.toLocaleLowerCase();

          novoTipoCand = await TipoCandidato.create({
            id_user: id,
            id_eleicao: novaEleicao.id,
            tipo: tipoCand,
          });

          arrTipoCand.push(tipoCand);
        }

        novaEleicao.dataValues.tipos_candidato = arrTipoCand;

        res.json(novaEleicao);
      } catch(err) {
        return res.status(400).json({
          errors: err.errors.map(e => e.message)
        })
      }

    } catch(err) {
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }
  }

  async index(req, res) {
    try {
      const { authorization } = req.headers;
      const [bearer, token] = authorization.split(' ');
      const dataToken = jwt.verify(token, process.env.TOKEN_SECRET);


      const eleicoes = await Eleicao.findAll({
          where: {
            [Op.and]: [
              { user_id: dataToken.id },
              { deletado: 0 }
            ]
          }
      });

      const tiposCandidato = await TipoCandidato.findAll();

      let novasEleicoes = [];
      novasEleicoes = eleicoes.map(data => {

        const id_eleicao = data.dataValues.id;

        let arrTiposCandidato = [];
        tiposCandidato.map(tipos => {
          if (tipos.dataValues.id_eleicao === id_eleicao) {
            arrTiposCandidato.push(tipos.dataValues.tipo);
          }
        })

        data.dataValues.tipos_candidato = arrTiposCandidato;
        return data;
      })

      return res.json(novasEleicoes);
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

      const idEleicao = eleicao.dataValues.id;

      const tiposCandidato = await TipoCandidato.findAll({
        where: { id_eleicao: idEleicao }
      });

      let arrTipoCand = [];
      tiposCandidato.map(data => {
        arrTipoCand.push(data.dataValues.tipo);
      });

      eleicao.dataValues.tipos_candidato = arrTipoCand;

      return res.json(eleicao);
    } catch(err) {
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }
  }

  async update(req, res) {
    try {
      const { authorization } = req.headers;
      const [bearer, token] = authorization.split(' ');
      const dataToken = jwt.verify(token, process.env.TOKEN_SECRET);
      const idEleicao = req.params.id;

      const eleicao = await Eleicao.findByPk(idEleicao);

      if (eleicao.dataValues.user_id !== dataToken.id) {
        return res.json({
          errors: 'Credenciais invalidas para atualizar esta eleicao'
        });
      }

      if (eleicao.dataValues.deletado) {
        return res.json({
          errors: 'Esta eleicao foi deletada'
        });
      }

      const novosDadosEleicao = await eleicao.update(req.body);

      return res.json(novosDadosEleicao);
    } catch (err) {
      return res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }
  }

}

export default new CriarEleicaoController();
