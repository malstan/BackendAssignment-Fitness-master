import { body } from "express-validator"
import { EXERCISE_DIFFICULTY } from "../utils/enums"

export const createExerciseValidation = [
    body('difficulty').isIn(Object.values(EXERCISE_DIFFICULTY)).withMessage((value, { req }) => req.__('validation.invalidDifficulty')),
    body('name').isString().withMessage((value, { req }) => req.__('validation.invalidName')),
    body('programID').isNumeric().withMessage((value, { req }) => req.__('validation.invalidId'))
]

export const updateExerciseValidation = [
    body('difficulty').optional().isIn(Object.values(EXERCISE_DIFFICULTY)).withMessage((value, { req }) => req.__('validation.invalidDifficulty')),
    body('name').optional().isString().withMessage((value, { req }) => req.__('validation.invalidName')),
]