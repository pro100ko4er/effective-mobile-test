import Appeal from "../models/AppealModel.js";

export default class AppealService {
    static async Create(subject, message) {
        const create = await Appeal.create({subject, message})
        return create
    }

    static async Handling(id) {
        const handling = await Appeal.update({status: "В работе"}, {
            where: {
                id
            }
        })
        return handling
    }   

    static async Success(id, answer) {
        const success = await Appeal.update({status: "Завершено", answer}, {
            where: {
            id
            }
        })
        return success
    }

    static async Close(id, answer) {
        const close = await Appeal.update({status: "Отменено", answer}, {
            where: {
                id
            }
        })
        return close
    }

    static async CloseAllInWork(answer) {
        const closeAllInWork = await Appeal.update({status: "Отменено", answer}, {
            where: {
                status: "В работе"
            }
        })
        return closeAllInWork
    }

    static async Get(id) {
        const appeal = await Appeal.findByPk(id)
        return appeal
    }

    static async GetAll(date_one, date_two, limit, page) {
        limit = Number(limit)
        page = Number(page)
        const offset = limit * page
        const all = await Appeal.findAndCountAll({
            where: {
                limit,
                offset
            }
        })
        return all
    }

}