import { Router } from 'express';
import v1Routes from './v1/index.js';

// All API versions are mounted here. A future /v2 would be added next to /v1.
const router = Router();

router.use('/v1', v1Routes);

export default router;
