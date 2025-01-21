import { body } from 'express-validator';
import { USER_ROLE } from '../utils/enums';

export const registerUserValidation = [
    body('name').optional().isString().withMessage('Invalid name.'),
    body('surname').optional().isString().withMessage('Invalid surname.'),
    body('nickName').optional().isString().withMessage('Invalid nickname.'),
    body('email').isEmail().withMessage('Invalid email.'),
    body('password').isLength({ min: 8 }).withMessage('Invalid password.'),
    body('age').optional().isNumeric().withMessage('Invalid age.'),
    body('role').optional().isIn([USER_ROLE.ADMIN, USER_ROLE.USER]).withMessage('Invalid role.')
]

export const loginUserValidation = [
    body('email').isEmail().withMessage('Invalid email.'),
    body('password').isLength({ min: 8 }).withMessage('Invalid password.')
]