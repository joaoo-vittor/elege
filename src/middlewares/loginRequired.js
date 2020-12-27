import jwt from 'jsonwebtoken';
import User from '../models/Cadastro';

export default async (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({
      errors: ['Login é requerido'],
    });
  }

  const [bearer, token] = authorization.split(' ');

  try {
    const dados = jwt.verify(token, process.env.TOKEN_SECRET);
    const { id, email } = dados;

    const user = await User.findOne({ where: { id, email } });

    if (!user) {
      return res.status(401).json({
        errors: ['usuario invalido'],
      });
    }

    req.userId = id;
    req.userEmail = email;

    return next();
  } catch(err) {
    return res.status(401).json({
      errors: ['Token expirou ou está invalido'],
    });
  }

};
