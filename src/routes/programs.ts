import { Router } from 'express'

import authentication from '../middleware/authentication'
import authorization from '../middleware/authorization'

import { idValidation, modeValidation } from '../validation/validation'
import { updateProgramExercisesValidation } from '../validation/program.validation'
import validateRequest from '../middleware/validation'

import { USER_ROLE } from '../utils/enums'
import programController from '../controllers/program.controller'

const router: Router = Router()

export default () => {
	router.get('/programs', programController.getAll)

	router.post('/program/:id/exercises/:mode', 
		[
			authentication, 
			authorization(USER_ROLE.ADMIN), 
			...idValidation,
			...modeValidation,
			...updateProgramExercisesValidation,
			validateRequest
		], 
		programController.assignProgramExercises
	)

	return router
}
