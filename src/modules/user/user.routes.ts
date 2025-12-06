import express from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/', auth('admin'), userController.getUsers);
router.put('/:userId',userController.updateUser)

export const userRoutes = router;
