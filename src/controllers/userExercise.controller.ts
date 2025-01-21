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
            message: req.__('programExercise.list')
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
                message: req.__('programExercise.tracked')
            })
            
        }  catch (err) {
            console.error({ message: "Error creating tracked exercise.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }
    }

    async removeTrackedExercise(req: Request, res: Response, next: NextFunction) {
        const userId = req.params.id

        // get record
        const trackedExercise = await UserExerciseModel.findByPk(req.params.trackedExerciseId)

        // check record
        if(!trackedExercise || trackedExercise.userId != userId)
            return res.status(404).json({ message: req.__('exercise.notFound') })

        try {
            trackedExercise.destroy()

            return res.json({ message: req.__('exercise.deleted') })
        }  catch (err) {
            console.error({ message: "Error removing tracked exercise.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }
    }
}

export default new UserExerciseController()