import { body } from 'express-validator';
import { USER_ROLE } from '../utils/enums';

export const updateUserValidation = [
    body('name').optional().isString().withMessage((value, { req }) => req.__('validation.invalidName')),
    body('surname').optional().isString().withMessage((value, { req }) => req.__('validation.invalidSurname')),
    body('nickName').optional().isString().withMessage((value, { req }) => req.__('validation.invalidNickame')),
    body('age').optional().isNumeric().withMessage((value, { req }) => req.__('validation.invalidAge')),
    body('role').optional().isIn([USER_ROLE.ADMIN, USER_ROLE.USER]).withMessage((value, { req }) => req.__('validation.invalidRole'))
]