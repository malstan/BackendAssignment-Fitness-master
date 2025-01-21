import { Router } from 'express'
import authentication from '../middleware/authentication'
import UserController from "../controllers/user.controller"
import checkAdminOrUser from '../middleware/checkAdminOrUser'
import { idValidation } from '../validation/validation'
import { validateRequest } from '../middleware/validation'
import { updateUserValidation } from '../validation/user.validation'

const router: Router = Router()

export default () => {
	router.get('/users', authentication, UserController.getAllUsers)

    router.get('/user/:id', [
        authentication, 
        ...idValidation, 
        validateRequest, 
        checkAdminOrUser 
    ], UserController.getUser)

    router.put('/user/:id', [
        authentication, 
        ...idValidation,
        ...updateUserValidation,
        validateRequest, 
        checkAdminOrUser 
    ], UserController.updateUser)

	return router
}
