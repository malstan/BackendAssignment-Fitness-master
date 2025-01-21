import { body } from "express-validator";

export const updateProgramExercisesValidation = [
    body('exerciseIds').isArray().withMessage((value, { req }) => req.__('validation.array'))
        .custom((ids) => ids.every((id: number) => Number.isInteger(id) && id > 0))
        .withMessage((value, { req }) => req.__('validation.invalidId')),
]