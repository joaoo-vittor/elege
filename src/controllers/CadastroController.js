import User from '../models/Cadastro';

class CadastroController {
  async store(req, res) {
    try {
      const newUser = await User.create(req.body);
      const { nome, email, tipo, deletado } = newUser;
      return res.json({ nome, email, tipo, deletado });
    } catch(err) {
      return  res.status(400).json({
        errors: err.errors.map(e => e.message)
      })
    }
  }
}

export default new CadastroController();
