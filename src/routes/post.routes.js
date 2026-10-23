import { Router } from 'express';
import {
    createPost,
    getAllPosts,
    updatePost,
    deletePost
} from '../controllers/post.controller.js';

import {
    createPostValidate,
    postIdValidate,
    updatePostValidate
} from '../middlewares/post.validation.js';

export const postRouter = Router();

postRouter.post('/', createPostValidate, createPost);
postRouter.get('/', getAllPosts);
postRouter.put('/:id', postIdValidate, updatePostValidate, updatePost);
postRouter.delete('/:id', postIdValidate, deletePost);