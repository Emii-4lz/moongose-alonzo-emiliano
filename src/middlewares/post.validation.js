import { body, param } from 'express-validator';
import { userModel } from '../models/user.model.js';
import { tagModel } from '../models/tag.model.js';
import { validate } from './validate.js';

export const createPostValidate = [
    body('title').notEmpty().withMessage('El título es obligatorio'),
    body('content').notEmpty().withMessage('El contenido es obligatorio'),
    body('user')
        .isMongoId().withMessage('El ID del usuario debe ser un ObjectId válido')
        .custom(async (userId) => {
            const userExists = await userModel.findById(userId);
            if (!userExists) throw new Error('El usuario asociado no existe.');
        }),
    body('tags')
        .optional()
        .isArray().withMessage('Las etiquetas deben ser un array de IDs')
        .custom(async (tags) => {
            if (tags && tags.length > 0) {
                for (const tagId of tags) {
                    const tagExists = await tagModel.findById(tagId);
                    if (!tagExists) throw new Error(`La etiqueta con ID ${tagId} no existe.`);
                }
            }
        }),
    validate
];

export const updatePostValidate = [
    body('title')
        .optional()
        .notEmpty().withMessage('El título no puede estar vacío'),
    body('content')
        .optional()
        .notEmpty().withMessage('El contenido no puede estar vacío'),
    body('tags')
        .optional()
        .isArray().withMessage('Las etiquetas deben ser un array de IDs')
        .custom(async (tags) => {
            if (tags && tags.length > 0) {
                for (const tagId of tags) {
                    const tagExists = await tagModel.findById(tagId);
                    if (!tagExists) throw new Error(`La etiqueta con ID ${tagId} no existe.`);
                }
            }
        }),
    validate
];

export const postIdValidate = [
    param('id').isMongoId().withMessage('El ID del post no es válido.'),
    validate
];