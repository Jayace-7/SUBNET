import { Router } from 'express';
import { getHealth } from '../../controllers/health.controller.js';

// Route = the "menu": which address and method maps to which controller.
const router = Router();

router.get('/health', getHealth);

export default router;
