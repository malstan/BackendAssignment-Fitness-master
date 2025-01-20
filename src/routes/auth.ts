import { NextFunction, Router, Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { UserModel } from "../db/user";
import jwt from 'jsonwebtoken';

const router: Router = Router()
const jwt_secret = 'my-jwt-secret'

export default () => {

    /**
     * Route to register user.
     * 
     * Expected body:
     */
    router.post('/register', async (req: Request, res: Response, next: NextFunction) => {

        const {name, surname, nickName, email, password, age, role} = req.body

        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            const user = new UserModel({ 
                name, 
                surname, 
                nickName, 
                email, 
                password: hashedPassword,
                age,
                role
            })

            await user.save()
            return res.status(201).json({ message: 'User registered successfully' })
        } catch (err) {
            return res.status(500).json({ message: 'Error registering user', error: err.message })
        }
    })

    /**
     * Route to login user.
     * 
     * Expected body:
     *      email: string,
     *      password: string
     */
    router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
        const {email, password} = req.body

        try {
            // check user
            const user = await UserModel.findOne({ where: { email }})
            if (!user) return res.status(404).json({ message: 'User not found' })

            // check password
            const isValidPassword = await bcrypt.compare(password, user.password)
            if(!isValidPassword) return res.status(400).json({ message: 'Invalid password' })

            // generate token
            const token = jwt.sign({ id: user.id, role: user.role }, jwt_secret, { expiresIn: '1d' })

            return res.status(200).json({ message: 'User logged in', token });

        } catch (err) {
            return res.status(500).json({ message: 'Error logging in', error: err.message })
        }
    })

    return router
}