import { Router } from 'express';

import cadastroController from '../controllers/CadastroController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.post('/', cadastroController.store);
router.put('/', loginRequired, cadastroController.update);


export default router;
