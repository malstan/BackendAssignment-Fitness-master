import { body } from "express-validator"
import { EXERCISE_DIFFICULTY } from "../utils/enums"

export const createExerciseValidation = [
    body('difficulty').isIn(Object.values(EXERCISE_DIFFICULTY)).withMessage('Invalid dificulty type.'),
    body('name').isString().withMessage('Invalid name.'),
    body('programID').isNumeric().withMessage('Invalid program ID.')
]

export const updateExerciseValidation = [
    body('difficulty').optional().isIn(Object.values(EXERCISE_DIFFICULTY)).withMessage('Invalid dificulty type.'),
    body('name').optional().isString().withMessage('Invalid name.'),
]