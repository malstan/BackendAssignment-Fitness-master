import { NextFunction, Request, Response } from "express";
import { Op } from "sequelize";

import { ExerciseModel } from "../db/exercise";
import { ProgramModel } from "../db/program";

/**
 * Class handles exercise management.
 * It can:
 *  get all exercises with pagination, filtering by program and fulltext search on name,
 *  create exercise,
 *  update exercise,
 *  delete exercise
 */
class ExerciseController {

    /**
     * Method to get all exercises with pagination.
     * It is possible to filter exercises by programID and fulltext search on exercise name.
     * 
     * @returns json response
     */
    async getAllExercises(req: Request, res: Response, _next: NextFunction) {
        const { page = 1, limit = 10, programID, search } = req.query

        // pagination
        const offset = (Number(page) - 1) * Number(limit)

        let filters: any = {}
        // filtering
        if (programID) filters.programID = programID

        // searching
        if (search)
            filters[Op.or] = [{ name: { [Op.like]: `%${search}%` } }]

        // get records
        const exercises = await ExerciseModel.findAndCountAll({
            where: filters,
            offset,
            limit: Number(limit),
            include: [{
                model: ProgramModel,
                as: 'program'
            }]
        })

        return res.json({
            data: exercises.rows,
            total: exercises.count,
            page: Number(page),
            message: req.__('exercise.list')
        })
    }

    /**
     * Create exercise with difficulty, name and program.
     * 
     * @returns json response
     */
    async createExercise(req: Request, res: Response, _next: NextFunction) {
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

    /**
     * Update exercise.
     * 
     * @returns json response
     */
    async updateExercise(req: Request, res: Response, _next: NextFunction) {
        // get record
        const exercise = await ExerciseModel.findByPk(req.params.id)

        // check record
        if (!exercise) return res.status(404).json({ message: req.__('exercise.notFound') })

        try {
            const { difficulty, name, programID } = req.body

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

        } catch (err) {
            console.error({ message: "Error updating exercise.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }

    }

    /**
     * Delete exercise.
     * 
     * @returns json response
     */
    async deleteExercise(req: Request, res: Response, _next: NextFunction) {
        // get record
        const exercise = await ExerciseModel.findByPk(req.params.id)

        // check record
        if (!exercise) return res.status(404).json({ message: req.__('exercise.notFound') })

        try {
            exercise.destroy()

            return res.json({ message: req.__('exercise.deleted') })

        } catch (err) {
            console.error({ message: "Error deleting exercise.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }
    }
}

export default new ExerciseController()