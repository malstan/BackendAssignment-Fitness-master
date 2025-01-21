import { NextFunction, Request, Response } from "express";
import { ProgramModel } from "../db/program";
import { ExerciseModel } from "../db/exercise";

class ProgramController {
    async getAll(req: Request, res: Response, next: NextFunction) {
        // get all records
        const programs = await ProgramModel.findAll()

		return res.json({
			data: programs,
			message: res.__('program.list')
		})
    }

    async updateProgramExercises(req: Request, res: Response, next: NextFunction) {
        // get record
        const program = await ProgramModel.findByPk(req.params.id)

        // check record
        if(!program) return res.status(404).json({ message: req.__('program.notFound') })

        try {
            const { exerciseIds } = req.body
            
            // find records
            const exercises = await ExerciseModel.findAll({where: { id: exerciseIds}})
            
            // add or remove associations
            if(req.params.mode === 'add')
                await program.addExercises(exercises)
            else if (req.params.mode === 'remove')
                await program.removeExercises(exercises)

            return res.json({message: req.__('programExercise.updated')})
        } catch(err) {
            console.error({ message: "Error updating program exercises.", error: err.message })
            return res.status(500).json({ message: req.__('smthWrong') })
        }
    }
}

export default new ProgramController()