import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateContact = [
    body('contactName')
        .trim()
        .notEmpty()
        .withMessage('El nombre del contacto es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El nombre del contacto debe tener entre 3 y 100 caracteres'),
    body('email')
        .trim()
        .notEmpty()
        .withMessage('El correo electrónico es obligatorio')
        .isEmail()
        .withMessage('Por favor ingrese un correo electrónico válido'),
    body('phoneNumber')
        .trim()
        .notEmpty()
        .withMessage('El número de teléfono es obligatorio')
        .matches(/^\+?[1-9]\d{1,14}$/)
        .withMessage('Por favor ingrese un número de teléfono válido'),
    body('photo')
        .optional()
        .trim() 
        .isURL()
        .withMessage('La foto debe ser una URL válida'),
    checkValidators
];

export const validateUpdateContactRequest = [
    param('id')
        .isMongoId()
        .withMessage('El ID del contacto debe ser un ID de MongoDB válido'),
        body('email')
            .trim()
            .notEmpty()
            .withMessage('El correo electrónico es obligatorio')
            .isEmail()
            .withMessage('Por favor ingrese un correo electrónico válido'),
        body('phoneNumber')
            .trim()
            .notEmpty()
            .withMessage('El número de teléfono es obligatorio')
            .matches(/^\+?[1-9]\d{1,14}$/)
            .withMessage('Por favor ingrese un número de teléfono válido'),
        body('photo')
            .optional()
            .trim() 
            .isURL()
            .withMessage('La foto debe ser una URL válida'),
        checkValidators
];

export const validateContactStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('El ID del contacto debe ser un ID de MongoDB válido'),
    checkValidators
];

export const validateGetContactById = [
    param('id')
        .isMongoId()
        .withMessage('El ID del contacto debe ser un ID de MongoDB válido'),
    checkValidators
];