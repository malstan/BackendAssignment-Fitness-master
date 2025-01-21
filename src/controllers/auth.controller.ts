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
    
        const {name, surname, nickName, email, password, age, role} = req.body

        try {
            const hashedPassword = await bcrypt.hash(password, 10)
            
            // create user
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
    }

    /**
     * Method to login user.
     * 
     * @returns json response
     */
    async login(req: Request, res: Response, _next: NextFunction) {
        const {email, password} = req.body

        // hardcoded just for purpose of this assignment
        const jwt_secret = 'my-jwt-secret'

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
    }
}

export default new AuthController()