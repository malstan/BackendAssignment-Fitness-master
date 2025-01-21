import { NextFunction, Request, Response } from "express";
import { UserExerciseModel } from "../db/userExercise";
import { ExerciseModel } from "../db/exercise";

class UserExerciseController {

    async getTrackedExercises(req: Request, res: Response, next: NextFunction) {

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
            message: 'List of tracked exercises.'
        })
    }

    async createTrackedExercise(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id

        try {
            const { exerciseTime, duration, exerciseId } = req.body

            const trackedExercise = new UserExerciseModel({exerciseTime, duration, userId, exerciseId})

            await trackedExercise.save()

            return res.status(201).json({
                data: trackedExercise,
                message: 'Exercise tracked.'
            })
            
        }  catch (err) {
            console.error({ message: "Error creating tracked exercise.", error: err.message })
            return res.status(500).json({ message: "Something went wrong." })
        }
    }

    async removeTrackedExercise(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id

        // get record
        const trackedExercise = await UserExerciseModel.findByPk(req.params.trackedExerciseId)

        // check record
        if(!trackedExercise || trackedExercise.userId != userId)
            return res.status(404).json({ message: 'Exercise not found.' })

        try {
            trackedExercise.destroy()

            return res.json({ message: "Exercise deleted." })
        }  catch (err) {
            console.error({ message: "Error removing tracked exercise.", error: err.message })
            return res.status(500).json({ message: "Something went wrong." })
        }
    }
}

export default new UserExerciseController()