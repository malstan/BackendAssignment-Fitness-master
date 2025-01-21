import { NextFunction, Request, Response } from "express";
import { UserModel } from "../db/user";
import { USER_ROLE } from "../utils/enums";

class UserController {

    /**
     * Get all users. Admins get all user data, users just id and nickname.
     * 
     * @returns json response
     */
    async getAllUsers(req: Request, res: Response, next: NextFunction) {
        // select fields
        let fields = ['id', 'nickName']
        if (req.user.role == USER_ROLE.ADMIN)
            fields.push('name', 'surname', 'email', 'age', 'role')

        // get records
        const users = await UserModel.findAll({ attributes: fields })

        return res.json({
            data: users,
            message: 'List of users.'
        })
    }

    /**
     * Get single user by ID.
     * 
     * @returns json response
     */
    async getUser(req: Request, res: Response, next: NextFunction) {
        // get record
        const user = await UserModel.findByPk(req.params.id)

        // check record
        if (!user) return res.status(404).json({ message: 'User not found.' })

        return res.json({
            data: user,
            message: 'User detail.'
        })
    }

    /**
     * Update user by ID.
     * 
     * @returns json response
     */
    async updateUser(req: Request, res: Response, next: NextFunction) {
        // get record
        const user = await UserModel.findByPk(req.params.id)

        // check record
        if (!user) return res.status(404).json({ message: 'User not found.' })

        const { name, surname, nickName, age, role } = req.body

        try {
            // update record
            user.name = name || user.name
            user.surname = surname || user.surname
            user.nickName = nickName || user.nickName
            user.age = age || user.age

            if (req.user.role == USER_ROLE.ADMIN)
                user.role = role || user.role

            // save record
            await user.save()

            return res.json({
                data: user,
                message: "User updated."
            })
        } catch (err) {
            console.error({ message: "Error updating user.", error: err.message })
            return res.status(500).json({ message: "Something went wrong." })
        }
    }
}

export default new UserController()