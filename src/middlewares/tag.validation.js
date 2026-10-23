import { body, param } from 'express-validator';
import { tagModel } from '../models/tag.model.js';
import { validate } from './validate.js';

export const createTagValidate = [
    body('name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser un texto')
        .custom(async (name) => {
            const tagExists = await tagModel.findOne({ name });
            if (tagExists) {
                throw new Error('Ya existe un tag/categoria con ese nombre.');
            }
        }),
    validate
];

export const updateTagValidate = [
    body('name')
        .notEmpty().withMessage('El nombre del tag es obligatorio')
        .isString().withMessage('El nombre debe ser un texto')
        .custom(async (name) => {
            const tagExists = await tagModel.findOne({ name });
            if (tagExists) {
                throw new Error('Ya existe un tag/categoria con ese nombre.');
            }
        }),
    validate
];

export const tagIdValidate = [
    param('id')
        .isMongoId().withMessage('El ID del tag no es un ObjectId válido.'),
    validate
];