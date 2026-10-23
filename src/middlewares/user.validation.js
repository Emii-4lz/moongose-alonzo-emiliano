import { body, param } from 'express-validator';
import { userModel } from '../models/user.model.js';
import { validate } from './validate.js';

export const createUserValidate = [
    body('username')
        .notEmpty().withMessage('El username es obligatorio')
        .isString().withMessage('El username debe ser un texto'),
    body('email')
        .isEmail().withMessage('Debe ser un formato de email válido')
        .custom(async (email) => {
            const userExists = await userModel.findOne({ email });
            if (userExists) {
                throw new Error('El email ya se encuentra registrado.');
            }
        }),
    body('password')
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validate
];

export const updateUserValidate = [
    body('username')
        .optional()
        .isString().withMessage('El username debe ser un texto'),
    body('email')
        .optional()
        .isEmail().withMessage('Debe ser un formato de email válido')
        .custom(async (email, { req }) => {
            const userExists = await userModel.findOne({ email });
            if (userExists && userExists._id.toString() !== req.params.id) {
                throw new Error('Por favor, ingrese otro gmail o ponga el suyo otra vez.');
            }
        }),
    body('password')
        .optional()
        .isLength({ min: 6 }).withMessage('La contraseña debe tener al menos 6 caracteres'),
    validate
];

export const userIdValidate = [
    param('id')
        .isMongoId().withMessage('El ID proporcionado no es un ObjectId válido de MongoDB.'),
    validate
];