import { Router } from 'express';
import { getDatabaseHealthcheck, getHealthcheck } from '../controllers/healthController.js';

const router = Router();

router.get('/', getHealthcheck);
router.get('/ready', getDatabaseHealthcheck);

export default router;
