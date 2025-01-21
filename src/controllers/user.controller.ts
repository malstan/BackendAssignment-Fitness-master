import { NextFunction, Request, Response } from "express";

import { UserModel } from "../db/user";
import { USER_ROLE } from "../utils/enums";

/**
 * Class handles user management.
 * It can:
 *  get all users,
 *  get single user,
 *  update user
 * 
 */
class UserController {

    /**
     * Get all users. Admins gets all user data, users just id and nickname.
     * 
     * @returns json response
     */
    async getAllUsers(req: Request, res: Response, _next: NextFunction) {
        // select fields
        let fields = ['id', 'nickName']
        if (req.user.role == USER_ROLE.ADMIN)
            fields.push('name', 'surname', 'email', 'age', 'role')

        // get records
        const users = await UserModel.findAll({ attributes: fields })

        return res.json({
            data: users,
            message: req.__('user.list')
        })
    }

    /**
     * Get single user by ID.
     * 
     * @returns json response
     */
    async getUser(req: Request, res: Response, _next: NextFunction) {
        // get record
        const user = await UserModel.findByPk(req.params.id)

        // check record
        if (!user) return res.status(404).json({ message: req.__('user.notFound') })

        return res.json({
            data: user,
            message: req.__('user.detail')
        })
    }

    /**
     * Update user by ID.
     * 
     * @returns json response
     */
    async updateUser(req: Request, res: Response, _next: NextFunction) {
        // get record
        const user = await UserModel.findByPk(req.params.id)

        // check record
        if (!user) return res.status(404).json({ message: req.__('user.notFound') })

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
                message: req.__('user.updated')
            })

        } catch (err) {
            console.error({ message: "Error updating user.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }
    }
}

export default new UserController()