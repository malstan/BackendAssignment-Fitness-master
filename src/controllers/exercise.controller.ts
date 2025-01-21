import { NextFunction, Request, Response } from "express";
import { ExerciseModel } from "../db/exercise";
import { ProgramModel } from "../db/program";

class ExerciseController {
    async getAllExercises(req: Request, res: Response, next: NextFunction) {
        const exercises = await ExerciseModel.findAll({
			include: [{
				model: ProgramModel,
				as: 'program'
			}]
		})

		return res.json({
			data: exercises,
			message: 'List of exercises'
		})
    }

    async createExercise(req: Request, res: Response, next: NextFunction) {
        try {
            const { difficulty, name, programID } = req.body

            // create record
            const exercise = new ExerciseModel({ difficulty, name, programID })

            await exercise.save()

            return res.status(201).json({
                data: exercise,
                message: 'Exercise created.'
            })
        } catch (err) {
            console.error({ message: "Error creating exercise.", error: err.message })
            return res.status(500).json({ message: "Something went wrong." })
        }
    }

    async updateExercise(req: Request, res: Response, next: NextFunction) {
        // get record
        const exercise = await ExerciseModel.findByPk(req.params.id)

        // check record
        if(!exercise) return res.status(404).json({ message: 'Exercise not found.' })
        
        try {
            const {difficulty, name, programID } = req.body

            // update record
            exercise.dificulty = difficulty || exercise.difficulty
            exercise.name = name || exercise.name
            
            exercise.programID = programID || exercise.program

            // save
            await exercise.save()

            return res.json({
                data: exercise,
                message: "Exercise updated."
            })
        } catch(err) {
            console.error({ message: "Error updating exercise.", error: err.message })
            return res.status(500).json({ message: "Something went wrong." })
        }

    }

    async deleteExercise(req: Request, res: Response, next: NextFunction) {
        // get record
        const exercise = await ExerciseModel.findByPk(req.params.id)

        // check record
        if(!exercise) return res.status(404).json({ message: 'Exercise not found.' })
        
        try {
            exercise.destroy()

            return res.json({ message: "Exercise deleted." })
        } catch(err) {
            console.error({ message: "Error deleting exercise.", error: err.message })
            return res.status(500).json({ message: "Something went wrong." })
        }
    }
}

export default new ExerciseController()