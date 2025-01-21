import { Router } from 'express'

import authentication from '../middleware/authentication'
import checkAdminOrUser from '../middleware/checkAdminOrUser'

import { idValidation } from '../validation/validation'
import validateRequest from '../middleware/validation'
import { updateUserValidation } from '../validation/user.validation'
import { removeTrackedExerciseValidation, trackExerciseValidation } from '../validation/userExercise.validation'

import userExerciseController from '../controllers/userExercise.controller'
import UserController from "../controllers/user.controller"

const router: Router = Router()

export default () => {
	router.get('/users', authentication, UserController.getAllUsers)

    router.get('/user/:id', 
        [
            authentication, 
            ...idValidation, 
            validateRequest, 
            checkAdminOrUser 
        ], 
        UserController.getUser
    )

    router.put('/user/:id', 
        [
            authentication, 
            ...idValidation,
            ...updateUserValidation,
            validateRequest, 
            checkAdminOrUser 
        ], 
        UserController.updateUser
    )
    
    // exercises
    router.get('/user/:id/exercises', 
        [
            authentication,
            ...idValidation,
            validateRequest,
            checkAdminOrUser
        ], 
        userExerciseController.getTrackedExercises
    )

    router.post('/user/:id/track', 
        [
            authentication,
            ...idValidation,
            ...trackExerciseValidation,
            validateRequest,
            checkAdminOrUser
        ], 
        userExerciseController.createTrackedExercise
    )

    router.delete('/user/:id/exercise/:trackedExerciseId', 
        [
            authentication,
            ...idValidation,
            ...removeTrackedExerciseValidation,
            validateRequest,
            checkAdminOrUser
        ], 
        userExerciseController.removeTrackedExercise
    )

	return router
}
