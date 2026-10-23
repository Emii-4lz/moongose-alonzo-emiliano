import { Router } from 'express';
import {
    createTag,
    getAllTags,
    updateTag,
    deleteTag
} from '../controllers/tag.controller.js';

import {
    createTagValidate,
    tagIdValidate,
    updateTagValidate
} from '../middlewares/tag.validation.js';

export const tagRouter = Router();

tagRouter.post('/', createTagValidate, createTag);
tagRouter.get('/', getAllTags);
tagRouter.put('/:id', tagIdValidate, updateTagValidate, updateTag);
tagRouter.delete('/:id', tagIdValidate, deleteTag);