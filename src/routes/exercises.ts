import { Router } from 'express'

import authentication from '../middleware/authentication'
import authorization from '../middleware/authorization'

import { createExerciseValidation, updateExerciseValidation } from '../validation/exercise.validation'
import { idValidation } from '../validation/validation'
import validateRequest from '../middleware/validation'

import { USER_ROLE } from '../utils/enums'
import exerciseController from '../controllers/exercise.controller'

const router: Router = Router()

export default () => {
	router.get('/exercises', exerciseController.getAllExercises)

	router.post('/exercise',
		[
			authentication,
			authorization(USER_ROLE.ADMIN),
			...createExerciseValidation,
			validateRequest
		],
		exerciseController.createExercise
	)

	router.put('/exercise/:id',
		[
			authentication,
			authorization(USER_ROLE.ADMIN),
			...idValidation,
			...updateExerciseValidation,
			validateRequest
		],
		exerciseController.updateExercise
	)

	router.delete('/exercise/:id',
		[
			authentication,
			authorization(USER_ROLE.ADMIN),
			...idValidation,
			validateRequest
		],
		exerciseController.deleteExercise
	)

	return router
}
