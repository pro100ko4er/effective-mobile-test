import 'dotenv/config'
import express, { json } from "express";
import cors from 'cors'
import api from "./routes/index.js";
import ErrorHandlingMiddleware from './middleware/ErrorHandlingMiddleware.js'
import sequelize from "./db/index.js";
import models from "./models/index.js";


const app = express()


const PORT = process.env.PORT || 3000
app.use(cors());
app.use(json())
app.use('/api', api)
app.use(ErrorHandlingMiddleware)

const bootstrap = async () => {
    try {
        console.log(Object.keys(sequelize.models))
        await sequelize.authenticate()
        await sequelize.sync({alter: true})
        app.listen(PORT, 'localhost', () => console.log("Server start in port " + PORT))
    } catch (error) {
        console.log(error)
    }
}

bootstrap()

