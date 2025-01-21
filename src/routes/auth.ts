import { Router } from "express";
import AuthController from "../controllers/auth.controller";
import { loginUserValidation, registerUserValidation } from "../validation/auth.validation";

const router: Router = Router()

export default () => {
    
    router.post('/register', registerUserValidation, AuthController.register)
    router.post('/login', loginUserValidation, AuthController.login)

    return router
}