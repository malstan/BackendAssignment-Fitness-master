import { body } from 'express-validator';
import { USER_ROLE } from '../utils/enums';

export const registerUserValidation = [
    body('name').isString().withMessage((value, { req }) => req.__('validation.invalidName')),
    body('surname').optional().isString().withMessage((value, { req }) => req.__('validation.invalidsurname')),
    body('nickName').optional().isString().withMessage((value, { req }) => req.__('validation.invalidNickane')),
    body('email').isEmail().withMessage((value, { req }) => req.__('validation.invalidEmail')),
    body('password').isLength({ min: 8 }).withMessage((value, { req }) => req.__('validation.invalidPassword')),
    body('age').optional().isNumeric().withMessage((value, { req }) => req.__('validation.invalidAge')),
    body('role').optional().isIn([USER_ROLE.ADMIN, USER_ROLE.USER]).withMessage((value, { req }) => req.__('validation.invalidRole'))
]

export const loginUserValidation = [
    body('email').isEmail().withMessage((value, { req }) => req.__('validation.invalidEmail')),
    body('password').isLength({ min: 8 }).withMessage((value, { req }) => req.__('validation.invalidPassword'))
]