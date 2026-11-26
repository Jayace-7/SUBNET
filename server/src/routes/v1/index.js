import { Router } from 'express';
import healthRoutes from './health.routes.js';

// Collects every version-1 route. New features are mounted here in later stages.
const router = Router();

router.use(healthRoutes);

export default router;
