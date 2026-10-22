import { Router } from 'express';
import { 
    createTag, 
    getAllTags, 
    updateTag, 
    deleteTag 
} from '../controllers/tag.controller.js';

export const tagRouter = Router();

tagRouter.post('/', createTag);
tagRouter.get('/', getAllTags);
tagRouter.put('/:id', updateTag);
tagRouter.delete('/:id', deleteTag);