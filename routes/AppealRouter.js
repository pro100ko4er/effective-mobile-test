import express from "express";
import AppealController from "../controllers/AppealController.js";
import { body } from "express-validator";
const AppealRouter = express()

AppealRouter.post('/create', body('subject').exists().withMessage("Поле тема должно иметь хотя бы один символ"), body('message').exists().withMessage("Поле сообщение должно иметь хотя бы один символ!"), AppealController.Create)
AppealRouter.put('/handling/:id', AppealController.Handling)
AppealRouter.put('/success', AppealController.Success)
AppealRouter.put('/close', AppealController.Close)
AppealRouter.put('/close-all-in-work', AppealController.CloseAllInWork)
AppealRouter.get('/all', AppealController.GetAll)
AppealRouter.get('/:id', AppealController.Get)


export default AppealRouter