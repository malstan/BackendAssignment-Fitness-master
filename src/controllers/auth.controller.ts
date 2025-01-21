import { NextFunction, Request, Response } from "express";
import { UserModel } from "../db/user";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

class AuthController {

    /**
     * Method to register user.
     * 
     * @returns json response
     */
    async register(req: Request, res: Response, _next: NextFunction) {
        try {
            const { name, surname, nickName, email, password, age, role } = req.body
            const hashedPassword = await bcrypt.hash(password, 10)

            // create user
            const user = new UserModel({ name, surname, nickName, email, password: hashedPassword, age, role })
            await user.save()

            return res.status(201).json({ message: 'User registered successfully' })
        } catch (err) {
            console.error({ message: 'Error registering user', error: err.message })
            return res.status(500).json({ message: "Something went wrong." })
        }
    }

    /**
     * Method to login user.
     * 
     * @returns json response
     */
    async login(req: Request, res: Response, _next: NextFunction) {
        // hardcoded just for purpose of this assignment
        const jwt_secret = 'my-jwt-secret'

        try {
            const { email, password } = req.body

            // check user
            const user = await UserModel.scope('withPassword').findOne({ where: { email } })
            if (!user) return res.status(404).json({ message: 'User not found' })

            // check password
            const isValidPassword = await bcrypt.compare(password, user.password)
            if (!isValidPassword) return res.status(400).json({ message: 'Invalid password' })

            // generate token
            const token = jwt.sign({ id: user.id, role: user.role }, jwt_secret, { expiresIn: '1d' })

            return res.status(200).json({ message: 'User logged in', token });

        } catch (err) {
            console.error({ message: 'Error logging in', error: err.message })
            return res.status(500).json({ message: "Something went wrong." })
        }
    }
}

export default new AuthController()