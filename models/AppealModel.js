import { DataTypes } from 'sequelize'
import sequelize from '../db/index.js'


const Appeal = sequelize.define(
    'Appeal',
    {
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            autoIncrement: true,
            primaryKey: true
        },
        subject: {
            type: DataTypes.STRING,
            allowNull: false
        },
        message: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false,
            defaultValue: "Новое"
        },
        answer: {
            type: DataTypes.STRING,
        }
    }
)


export default Appeal