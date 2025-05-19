import { validationResult } from "express-validator"
import ApiError from "../error/ApiError.js"
import AppealService from "../services/AppealService.js"
export default class AppealController {
    static async Create(req, res, next) {
        try {
            const errors = validationResult(req)
            if(!errors.isEmpty()) {
                return next(ApiError.BadRequest("Произошла ошибка валидации данных!", errors))
            }
            const {subject, message} = req.body
            const data = await AppealService.Create(subject, message)
            return res.status(200).json(data)
        } catch (error) {
            return next(error)
        }
    }
    static async Handling(req, res, next) {
        try {
            const {id} = req.params
            const data = await AppealService.Handling(id)
            return res.status(200).json(data)
        } catch (error) {
            return next(error)
        }
    }

    static async Success(req, res, next) {
        try {
            const {id, answer} = req.body
            const data = await AppealService.Success(id, answer)
            return res.status(200).json(data)
        } catch (error) {
            return next(error)
        }
    }

    static async Close(req, res, next) {
        try {
            const {id, answer} = req.body
            const data = await AppealService.Close(id, answer)
            return res.status(200).json(data)
        } catch (error) {
            return next(error)
        }
    }

       static async CloseAllInWork(req, res, next) {
        try {
            const {answer} = req.body
            const data = await AppealService.CloseAllInWork(answer)
            return res.status(200).json(data)
        } catch (error) {
            return next(error)
        }
    }

    static async Get(req, res, next) {
        try {
            const {id} = req.params
            const data = await AppealService.Get(id)
            return res.status(200).json(data)
        } catch (error) {
            return next(error)
        }
    }

    static async GetAll(req, res, next) {
        try {
            const {date_one, date_two, limit, page} = req.query
            const data = await AppealService.GetAll(date_one, date_two, limit, page)
            return res.status(200).json(data)
        } catch (error) {
            return next(error)
        }
    }

}