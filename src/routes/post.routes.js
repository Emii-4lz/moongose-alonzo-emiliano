import { Router } from 'express';
import { 
    createPost, 
    getAllPosts, 
    updatePost, 
    deletePost 
} from '../controllers/post.controller.js';

export const postRouter = Router();

postRouter.post('/', createPost);
postRouter.get('/', getAllPosts);
postRouter.put('/:id', updatePost);
postRouter.delete('/:id', deletePost);