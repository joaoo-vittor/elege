import User from '../models/Cadastro';
import jwt from 'jsonwebtoken';


const errRes = (res, status, err) => {
  return res.status(status).json({
    errors: err.errors.map(e => e.message)
  });
}

class CadastroController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { nome, email, tipo, deletado } = newUser;
      return res.json({ nome, email, tipo, deletado });
    } catch(err) {
      return errRes(res, 400, err);
    }
  }

  async update(req, res) {
    try {
      const authorization = req.headers.authorization;
      const [bearer, token] = authorization.split(' ');
      const dataToken = jwt.verify(token, process.env.TOKEN_SECRET);

      const user = await User.findByPk(dataToken.id);

      if (!user) {
        return res.json({ errors: 'Usuario não existe'});
      }

      if (req.body.tipo) {
        return res.json({ errors: '"tipo" é um valor invalido' });
      }

      const newData = await user.update(req.body);

      const { id, nome, email, deletado } = newData;
      return res.json({ id, nome, email, deletado });
    } catch (err) {
      return rerRes(res, 400, err);
    }
  }
}

export default new CadastroController();
