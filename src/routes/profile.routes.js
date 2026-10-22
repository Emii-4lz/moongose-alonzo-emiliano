import { Router } from 'express';
import { 
    createProfile, 
    getAllProfiles, 
    updateProfile, 
    deleteProfile 
} from '../controllers/profile.controller.js';

export const profileRouter = Router();

profileRouter.post('/', createProfile);
profileRouter.get('/', getAllProfiles);
profileRouter.put('/:id', updateProfile);
profileRouter.delete('/:id', deleteProfile);