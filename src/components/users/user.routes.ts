import { Router } from 'express';
import { deleteUser, editUser, getUser, getUsers } from './user.controller';

const router = Router();

router.route('/').get(getUsers);
router.route('/:username').get(getUser).delete(deleteUser).put(editUser);

export default router;
