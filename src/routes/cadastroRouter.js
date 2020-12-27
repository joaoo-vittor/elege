import { Router } from 'express';

import cadastroController from '../controllers/CadastroController';

const router = new Router();

router.post('/', cadastroController.store);

export default router;
