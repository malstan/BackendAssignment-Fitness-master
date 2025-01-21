import { body } from "express-validator";

export const updateProgramExercisesValidation = [
    body('exerciseIds').isArray().withMessage('Must be an array.')
        .custom((ids) => ids.every((id: number) => Number.isInteger(id) && id > 0))
        .withMessage('All IDs must be positive integers.'),
]