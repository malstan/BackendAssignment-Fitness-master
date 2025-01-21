import { body, param } from "express-validator";

export const trackExerciseValidation = [
    body('exerciseTime').isISO8601().withMessage('Invalid datetime format.'),
    body('duration').isNumeric().withMessage('Invalid duration format.'),
    body('exerciseId').isNumeric().withMessage('Invalid exercise ID.')
]

export const removeTrackedExerciseValidation = [
    param('trackedExerciseId').isNumeric().withMessage('Invalid exercise ID.')
]