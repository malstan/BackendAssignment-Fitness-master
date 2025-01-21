import { body } from 'express-validator';
import { USER_ROLE } from '../utils/enums';

export const updateUserValidation = [
    body('name').optional().isString().withMessage('Invalid name.'),
    body('surname').optional().isString().withMessage('Invalid surname.'),
    body('nickName').optional().isString().withMessage('Invalid nickname.'),
    body('age').optional().isNumeric().withMessage('Invalid age.'),
    body('role').optional().isIn([USER_ROLE.ADMIN, USER_ROLE.USER]).withMessage('Invalid role.')
]