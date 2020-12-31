import { Router } from 'express';

import candidatoController from '../controllers/CandidatoController';
import loginRequired from '../middlewares/loginRequired';

const router = new Router();

router.get('/', loginRequired, candidatoController.index);
router.post('/:id/create', loginRequired, candidatoController.store);
router.put('/:id/update', loginRequired, candidatoController.update);

export default router;
