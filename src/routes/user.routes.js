import { Router } from 'express';
import { 
    createUser, 
    getAllUsers, 
    updateUser, 
    deleteUser 
} from '../controllers/user.controller.js';

export const userRouter = Router();

userRouter.post('/', createUser);
userRouter.get('/', getAllUsers);
userRouter.put('/:id', updateUser);
userRouter.delete('/:id', deleteUser);