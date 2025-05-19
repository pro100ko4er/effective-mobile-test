import express from "express";
import AppealRouter from "./AppealRouter.js";
const api = express()

api.use('/appeal', AppealRouter)

export default api