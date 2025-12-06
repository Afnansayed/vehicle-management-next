import express from 'express';
import { userController } from './user.controller';
import auth from '../../middleware/auth';

const router = express.Router();

router.get('/', auth('admin'), userController.getUsers);

export const userRoutes = router;
