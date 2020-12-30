import { Router } from 'express';

import loginRequired from '../middlewares/loginRequired';
import CriarEleicaoController from '../controllers/CriarEleicaoController';

const router = Router();

router.post('/', loginRequired, CriarEleicaoController.store);
router.get('/:id', loginRequired, CriarEleicaoController.show);
router.get('/', loginRequired, CriarEleicaoController.index);
router.put('/:id/update', loginRequired, CriarEleicaoController.update);

export default router;
