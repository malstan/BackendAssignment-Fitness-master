import { body, param } from "express-validator";

export const trackExerciseValidation = [
    body('exerciseTime').isISO8601().withMessage((value, { req }) => req.__('validation.invlaidDatetime')),
    body('duration').isNumeric().withMessage((value, { req }) => req.__('validation.invalidDuration')),
    body('exerciseId').isNumeric().withMessage((value, { req }) => req.__('validation.invalidId'))
]

export const removeTrackedExerciseValidation = [
    param('trackedExerciseId').isNumeric().withMessage((value, { req }) => req.__('validation.invalidId'))
]