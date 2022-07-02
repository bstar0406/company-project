import { Router } from 'express';
import users from './test/test.route';

const router: Router = Router();

router.use('/test', users);

export default router;
