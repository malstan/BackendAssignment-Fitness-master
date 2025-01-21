import {
	Router,
	Request,
	Response,
	NextFunction
} from 'express'

import programController from '../controllers/program.controller'
import authentication from '../middleware/authentication'
import authorization from '../middleware/authorization'
import { USER_ROLE } from '../utils/enums'
import { idValidation, modeValidation } from '../validation/validation'
import validateRequest from '../middleware/validation'
import { updateProgramExercisesValidation } from '../validation/program.validation'

const router: Router = Router()

export default () => {
	router.get('/programs', programController.getAll)
	router.post('/program/:id/exercises/:mode', [
		authentication, 
		authorization(USER_ROLE.ADMIN), 
		...idValidation,
		...modeValidation,
		...updateProgramExercisesValidation,
		validateRequest
	], programController.updateProgramExercises)

	return router
}
