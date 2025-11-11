import { Router } from 'express';
import { getHealthcheck } from '../controllers/healthController.js';

const router = Router();

router.get('/', getHealthcheck);

export default router;
