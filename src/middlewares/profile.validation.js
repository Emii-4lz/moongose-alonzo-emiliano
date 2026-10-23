import { body, param } from 'express-validator';
import { profileModel } from '../models/profile.model.js';
import { userModel } from '../models/user.model.js';
import { validate } from './validate.js';

export const createProfileValidate = [
    body('first_name')
        .notEmpty().withMessage('El nombre es obligatorio')
        .isString().withMessage('El nombre debe ser texto'),
    body('last_name')
        .notEmpty().withMessage('El apellido es obligatorio')
        .isString().withMessage('El apellido debe ser texto'),
    body('bio')
        .optional()
        .isString().withMessage('La biografía debe ser texto'),
    body('address')
        .isArray({ min: 1 }).withMessage('Debe incluir al menos una dirección válida'),
    body('address.*.street')
        .notEmpty().withMessage('La calle de la dirección es obligatoria'),
    body('address.*.city')
        .notEmpty().withMessage('La ciudad de la dirección es obligatoria'),
    body('address.*.country')
        .notEmpty().withMessage('El país de la dirección es obligatorio'),
    body('user')
        .isMongoId().withMessage('El ID del usuario debe ser un ObjectId válido')
        .custom(async (userId) => {
            const userExists = await userModel.findById(userId);
            if (!userExists) throw new Error('El usuario asociado no existe.');

            const profileExists = await profileModel.findOne({ user: userId });
            if (profileExists) throw new Error('Este usuario ya tiene un perfil asignado.');
        }),
    validate
];

export const updateProfileValidate = [
    body('bio')
        .optional()
        .isString().withMessage('La biografía debe ser texto'),
    body('address')
        .optional()
        .isArray().withMessage('Las direcciones deben ser un array'),
    body('address.*.street')
        .optional()
        .notEmpty().withMessage('La calle no puede estar vacía'),
    body('address.*.city')
        .optional()
        .notEmpty().withMessage('La ciudad no puede estar vacía'),
    body('address.*.country')
        .optional()
        .notEmpty().withMessage('El país no puede estar vacío'),
    validate
];

export const profileIdValidate = [
    param('id')
        .isMongoId().withMessage('El ID del perfil no es un ObjectId válido.'),
    validate
];