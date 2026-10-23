import { Router } from 'express';
import {
    createUser,
    getAllUsers,
    updateUser,
    deleteUser
} from '../controllers/user.controller.js';

import {
    userIdValidate,
    createUserValidate,
    updateUserValidate
} from "../middlewares/user.validation.js"

export const userRouter = Router();

userRouter.post('/', createUserValidate, createUser);
userRouter.get('/', getAllUsers);
userRouter.put('/:id', userIdValidate, updateUserValidate, updateUser);
userRouter.delete('/:id', userIdValidate, deleteUser);