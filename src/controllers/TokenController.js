import User from '../models/Cadastro';
import jwt from 'jsonwebtoken';

class TokenController {
  async store(req, res) {
    const { email = '', senha = '' } = req.body;

    if (!email || !senha) {
      return res.status(401).json({
        errors: ['Credencias invalidas'],
      });
    }

    const user = await User.findOne({ where: { email }});

    if (user.dataValues.deletado) {
      return res.status(401).json({
        errors: 'Usuario deletado',
      })
    }

    if (!user) {
      return res.status(401).json({
        errors: ['Usuario não existe'],
      })
    }

    if (!(await user.senhaValida(senha))) {
      return res.status(401).json({
        errors: ['senha invalida'],
      });
    }

    const { id } = user;
    const token = jwt.sign({ id, email }, process.env.TOKEN_SECRET, {
      expiresIn: process.env.TOKEN_EXPIRATION,
    });

    return res.json({ token, user: { nome: user.nome, email, id } });
  }
}

export default new TokenController();
