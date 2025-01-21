import { Router } from "express";

import { loginUserValidation, registerUserValidation } from "../validation/auth.validation";
import validateRequest from '../middleware/validation'

import AuthController from "../controllers/auth.controller";

const router: Router = Router()

export default () => {

    router.post('/register', registerUserValidation, validateRequest, AuthController.register)
    router.post('/login', loginUserValidation, validateRequest, AuthController.login)

    return router
}