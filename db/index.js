import { Sequelize } from "sequelize";

console.log(process.env.DB_LOGIN)

const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_LOGIN, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
})

export default sequelize