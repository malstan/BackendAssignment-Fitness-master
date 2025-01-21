
import { DataTypes, Sequelize } from "sequelize";
import { DatabaseModel } from "../types/db";
import { ExerciseModel } from "./exercise";
import { UserModel } from "./user";

export class UserExerciseModel extends DatabaseModel {
    id: number
    exerciseTime: Date
    duration: number

    user: UserModel
    exercise: ExerciseModel
}

export default (sequelize: Sequelize) => {
    UserExerciseModel.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        exerciseTime: {
            type: DataTypes.DATE,
            allowNull: false,
        },
        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        paranoid: false,
        timestamps: true,
        sequelize,
        modelName: 'userExercise'
    })

    UserExerciseModel.associate = (models) => {
        UserExerciseModel.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user'
        })

        UserExerciseModel.belongsTo(models.Exercise, {
            foreignKey: 'exerciseId',
            as: 'exercise'
        })
    }

    return UserExerciseModel
}