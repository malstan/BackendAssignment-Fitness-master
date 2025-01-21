import { DataTypes, Sequelize } from "sequelize";
import { DatabaseModel } from "../types/db";
import { USER_ROLE } from "../utils/enums";

export class UserModel extends DatabaseModel {
    id: number
    name: string
    surname: string
    nickName: string
    email: string
    password: string
    age: number
    role: USER_ROLE
}

export default (sequelize: Sequelize) => {
    UserModel.init({
        id: {
            type: DataTypes.BIGINT,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: DataTypes.STRING(50),
        },
        surname: {
            type: DataTypes.STRING(50),
        },
        nickName: {
            type: DataTypes.STRING(50),
        },
        email: {
            type: DataTypes.STRING(50),
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING(100),
            allowNull: false,
            validate: {
                len: [8, 100]
            },
        },
        age: {
            type: DataTypes.INTEGER,
        },
        role: {
            type: DataTypes.ENUM(...Object.values(USER_ROLE)),
            defaultValue: USER_ROLE.USER
        }
    }, {
        paranoid: true,
        timestamps: true,
        sequelize,
        modelName: 'user',
        defaultScope: {
            attributes: { exclude: ['password'] }
        },
        scopes: {
            withPassword: { attributes: { exclude: [] } }
        }
    })

    UserModel.associate = (models) => {
        UserModel.belongsToMany(models.Exercise, {
            through: models.UserExercise,
            foreignKey: 'userId',
            as: 'exercises'
        })
    }

    return UserModel
}