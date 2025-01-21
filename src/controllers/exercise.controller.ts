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
			message: req.__('exercise.list')
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
                message: req.__('exercise.created')
            })
        } catch (err) {
            console.error({ message: "Error creating exercise.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }
    }

    async updateExercise(req: Request, res: Response, next: NextFunction) {
        // get record
        const exercise = await ExerciseModel.findByPk(req.params.id)

        // check record
        if(!exercise) return res.status(404).json({ message: req.__('exercise.notFound') })
        
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
                message: req.__('exercise.updated')
            })
        } catch(err) {
            console.error({ message: "Error updating exercise.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }

    }

    async deleteExercise(req: Request, res: Response, next: NextFunction) {
        // get record
        const exercise = await ExerciseModel.findByPk(req.params.id)

        // check record
        if(!exercise) return res.status(404).json({ message: req.__('exercise.notFound') })
        
        try {
            exercise.destroy()

            return res.json({ message: req.__('exercise.deleted') })
        } catch(err) {
            console.error({ message: "Error deleting exercise.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }
    }
}

export default new ExerciseController()