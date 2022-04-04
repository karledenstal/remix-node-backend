import { Router } from 'express';
import { getUser, getUsers } from './user.controller';

const router = Router();

router.route('/').get(getUsers);
router.route('/:username').get(getUser);

export default router;
