import { Router } from 'express';
import { login, signup } from './user.controller';

const router = Router();

router.route('/signup').post(signup);
router.route('/login').post(login);

export default router;
