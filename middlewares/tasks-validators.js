import { body, param } from "express-validator";
import { checkValidators } from "./check-validators.js";

export const validateCreateTask = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('El título de la tarea es obligatorio')
        .isLength({ min: 3, max: 100 })
        .withMessage('El título de la tarea debe tener entre 3 y 100 caracteres'),  
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción de la tarea no debe exceder los 500 caracteres'),
    body('expiredDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha de vencimiento debe ser una fecha válida en formato ISO 8601'),
    body('priority')
        .optional()
        .isIn(['Baja', 'Media', 'Alta'])
        .withMessage('La prioridad debe ser "Baja", "Media" o "Alta"'),
    checkValidators
];

export const validateUpdateTaskRequest = [
    param('id')
        .isMongoId()
        .withMessage('El ID de la tarea no es válido'),
    body('title')
        .optional()
        .trim()
        .isLength({ min: 3, max: 100 })
        .withMessage('El título de la tarea debe tener entre 3 y 100 caracteres'),
    body('description')
        .optional()
        .trim()
        .isLength({ max: 500 })
        .withMessage('La descripción de la tarea no debe exceder los 500 caracteres'),
    body('expiredDate')
        .optional()
        .isISO8601()
        .withMessage('La fecha de vencimiento debe ser una fecha válida en formato ISO 8601'),
    body('priority')
        .optional()
        .isIn(['Baja', 'Media', 'Alta'])
        .withMessage('La prioridad debe ser "Baja", "Media" o "Alta"'),
    checkValidators
];

export const validateTaskStatusChange = [
    param('id')
        .isMongoId()
        .withMessage('El ID de la tarea no es válido'),
    checkValidators
];

export const validateGetTaskById = [
    param('id')
        .isMongoId()
        .withMessage('El ID de la tarea no es válido'),
    checkValidators
];
