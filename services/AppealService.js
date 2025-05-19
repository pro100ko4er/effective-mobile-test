import { Op } from "sequelize";
import Appeal from "../models/AppealModel.js";
import ApiError from "../error/ApiError.js";
export default class AppealService {
    static async Create(subject, message) {
        const create = await Appeal.create({subject, message})
        return create
    }

    static async Handling(id) {
        const handling = await Appeal.update({status: "В работе"}, {
            where: {
                id,
                status: "Новое"
            }
        })
        if(handling[0] <= 0) {
            throw ApiError.BadRequest("Обращение не найдено!")
        }
        return handling
    }   

    static async Success(id, answer) {
        const success = await Appeal.update({status: "Завершено", answer}, {
            where: {
            id,
            status: {
               [Op.in]: ['В работе', 'Новое']
            }
            }
        })
          if(success[0] <= 0) {
            throw ApiError.BadRequest("Обращение не найдено!")
        }
        return success
    }

    static async Close(id, answer) {
        const close = await Appeal.update({status: "Отменено", answer}, {
            where: {
                id,
                status: {
               [Op.in]: ['В работе', 'Новое']
            }
            }
        })
        if(close[0] <= 0) {
            throw ApiError.BadRequest("Обращение не найдено!")
        }
        return close
    }

    static async CloseAllInWork(answer) {
        const closeAllInWork = await Appeal.update({status: "Отменено", answer}, {
            where: {
                status: {
               [Op.in]: ['В работе', 'Новое']
            }
            }
        })
        return closeAllInWork
    }

    static async Get(id) {
        const appeal = await Appeal.findByPk(id)
        if(!appeal) {
            throw ApiError.BadRequest("Обращение не найдено!")
        }
        return appeal
    }

    static async GetAll(date_one, date_two, limit = 100, page = 1) {
        limit = Number(limit)
        page = Number(page)
        const offset = limit * (page - 1)
        const where = {};


if (date_one && date_two) {
  where.createdAt = {
    [Op.between]: [
      `${date_one} 00:00:00`,
      `${date_two} 23:59:59`
    ]
  };
} else if (date_one) {
  where.createdAt = {
    [Op.gte]: `${date_one} 00:00:00`
  };
} else if (date_two) {
  where.createdAt = {
    [Op.lte]: `${date_two} 23:59:59`
  };
}

 
const all = await Appeal.findAndCountAll({
  where,
  limit,
  offset
});
return all
    }

}