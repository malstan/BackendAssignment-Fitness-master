import { NextFunction, Request, Response } from "express";

import { UserExerciseModel } from "../db/userExercise";
import { ExerciseModel } from "../db/exercise";

/**
 * Class handles exercises of user.
 * It can:
 *  get all tracked exercises,
 *  crate tracked exercise,
 *  remove tracked exercise
 * 
 */
class UserExerciseController {

    /**
     * Get all tracked exercises of user by his id.
     * 
     * @returns json response
     */
    async getTrackedExercises(req: Request, res: Response, _next: NextFunction) {
        const userId = req.params.id

        const trackedExercises = await UserExerciseModel.findAll({
            where: { userId },
            include: [{
                model: ExerciseModel,
                as: 'exercise',
                attributes: ['id', 'name', 'difficulty']
            }]
        })

        return res.json({
            data: trackedExercises,
            message: req.__('programExercise.list')
        })
    }

    /**
     * Create tracked exercise for user by his id and exercise id.
     * 
     * @returns json response
     */
    async createTrackedExercise(req: Request, res: Response, _next: NextFunction) {
        const userId = req.params.id

        try {
            const { exerciseTime, duration, exerciseId } = req.body

            // create
            const trackedExercise = new UserExerciseModel({ exerciseTime, duration, userId, exerciseId })

            await trackedExercise.save()

            return res.status(201).json({
                data: trackedExercise,
                message: req.__('programExercise.tracked')
            })

        } catch (err) {
            console.error({ message: "Error creating tracked exercise.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }
    }

    /**
     * Remove tracked exercise of user by his id.
     * 
     * @returns json response
     */
    async removeTrackedExercise(req: Request, res: Response, _next: NextFunction) {
        const userId = req.params.id

        // get record
        const trackedExercise = await UserExerciseModel.findByPk(req.params.trackedExerciseId)

        // check record
        if (!trackedExercise || trackedExercise.userId != userId)
            return res.status(404).json({ message: req.__('exercise.notFound') })

        try {
            trackedExercise.destroy()

            return res.json({ message: req.__('exercise.deleted') })

        } catch (err) {
            console.error({ message: "Error removing tracked exercise.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }
    }
}

export default new UserExerciseController()