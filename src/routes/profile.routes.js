import { Router } from 'express';
import {
    createProfile,
    getAllProfiles,
    updateProfile,
    deleteProfile
} from '../controllers/profile.controller.js';

import {
    createProfileValidate,
    profileIdValidate,
    updateProfileValidate
} from '../middlewares/profile.validation.js';

export const profileRouter = Router();

profileRouter.post('/', createProfileValidate, createProfile);
profileRouter.get('/', getAllProfiles);
profileRouter.put('/:id', profileIdValidate, updateProfileValidate, updateProfile);
profileRouter.delete('/:id', profileIdValidate, deleteProfile);