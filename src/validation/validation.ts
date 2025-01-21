import { param } from "express-validator";

export const idValidation = [
    param('id').isInt({ min: 1 }).withMessage((value, { req }) => req.__('validation.invalidId'))
]

export const modeValidation = [
    param('mode').isIn(['add', 'remove']).withMessage((value, { req }) => req.__('validation.invalidMode'))
]