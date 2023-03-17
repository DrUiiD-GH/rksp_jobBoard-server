const {Description, Vacancy} = require("../models/models");
const ApiError = require("../error/ApiError");
const {where} = require("sequelize");


class VacancyController {

    async create(req, res, next){
        try {
            const {
                title,
                nameCompany,
                salaryFrom,
                salaryTo,
                contacts,
                categoryId,
                employmentId,
                scheduleId,
                experienceId,
                description
            } = req.body
            const id = req.user.id

            const vacancy = await Vacancy.create({
                title,
                nameCompany,
                salaryFrom,
                salaryTo,
                contacts,
                userId:id,
                categoryId,
                employmentId,
                scheduleId,
                experienceId,
            })

            await Description.create(
                {
                    text:description,
                    vacancyId:vacancy.id
                }
            )
            return res.json(vacancy)
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

    async getAll(req, res){
        try {
            let vacancies;
            let {categoryId, employmentId, scheduleId, experienceId, limit, page} = req.query
            page = page || 1
            limit = limit || 10
            let offset = (page - 1) * limit
            if(!categoryId && !employmentId && !scheduleId && !experienceId){ //0000
                vacancies = await Vacancy.findAndCountAll({limit, offset})
            }
            if(!categoryId && !employmentId && !scheduleId && experienceId){//0001
                vacancies = await Vacancy.findAndCountAll({where:{experienceId}, limit, offset})
            }
            if(!categoryId && !employmentId && scheduleId && !experienceId){//0010
                vacancies = await Vacancy.findAndCountAll({where:{scheduleId}, limit, offset})
            }
            if(!categoryId && !employmentId && scheduleId && experienceId){//0011
                vacancies = await Vacancy.findAndCountAll({where:{scheduleId, experienceId}, limit, offset})
            }
            if(!categoryId && employmentId && !scheduleId && !experienceId){//0100
                vacancies = await Vacancy.findAndCountAll({where:{employmentId}, limit, offset})
            }
            if(!categoryId && employmentId && !scheduleId && experienceId){//0101
                vacancies = await Vacancy.findAndCountAll({where:{employmentId, experienceId}, limit, offset})
            }
            if(!categoryId && employmentId && scheduleId && !experienceId){//0110
                vacancies = await Vacancy.findAndCountAll({where:{employmentId, scheduleId}, limit, offset})
            }
            if(!categoryId && employmentId && scheduleId && experienceId){//0111
                vacancies = await Vacancy.findAndCountAll({where:{employmentId, scheduleId, experienceId}, limit, offset})
            }
            if(categoryId && !employmentId && !scheduleId && !experienceId){//1000
                vacancies = await Vacancy.findAndCountAll({where:{categoryId}, limit, offset})
            }
            if(categoryId && !employmentId && !scheduleId && experienceId){//1001
                vacancies = await Vacancy.findAndCountAll({where:{categoryId, experienceId}, limit, offset})
            }
            if(categoryId && !employmentId && scheduleId && !experienceId){//1010
                vacancies = await Vacancy.findAndCountAll({where:{categoryId, scheduleId}, limit, offset})
            }
            if(categoryId && !employmentId && scheduleId && experienceId){//1011
                vacancies = await Vacancy.findAndCountAll({where:{categoryId, scheduleId, experienceId}, limit, offset})
            }
            if(categoryId && employmentId && !scheduleId && !experienceId){//1100
                vacancies = await Vacancy.findAndCountAll({where:{categoryId, employmentId}, limit, offset})
            }
            if(categoryId && employmentId && !scheduleId && experienceId){//1101
                vacancies = await Vacancy.findAndCountAll({where:{categoryId, employmentId, experienceId}, limit, offset})
            }
            if(categoryId && employmentId && scheduleId && experienceId){//1111
                vacancies = await Vacancy.findAndCountAll({where:{categoryId, employmentId, scheduleId, experienceId}, limit, offset})
            }
            return res.json(vacancies)

        }catch (e){
            res.json(e.message)
        }
    }

    async getAllByUserId(req, res, next){
        try {
            const vacancy = await Vacancy.findAll({where: {userId:req.user.id}})
            return res.json(vacancy)
        }catch (e){
            req.json(e.message)
        }
    }

    async getOne(req, res) {
        const {id} = req.params
        const vacancy = await Vacancy.findOne(
            {
                where: {id},
                include:{model:Description, as:'description'}
            }
        )
        return res.json(vacancy)
    }

    async edit(req, res, next){
        try {
            const {id} = req.params

            const vac = await Vacancy.findOne({where:{id}})
            if(req.user.id !==  vac.userId){
                return res.status(403).json({message:"Ошибка доступа"})
            }

            const {
                title,
                nameCompany,
                salaryFrom,
                salaryTo,
                contacts,
                categoryId,
                employmentId,
                scheduleId,
                experienceId,
                description
            } = req.body
            await Vacancy.update(
                {
                    title,
                    nameCompany,
                    salaryFrom,
                    salaryTo,
                    contacts,
                    categoryId,
                    employmentId,
                    scheduleId,
                    experienceId
                }, {
                    where:{id}
                })

            if (description) {
                await Description.update({
                        text: description
                    }, {
                        where: {vacancyId: id}
                    }
                )
            }


            return res.status(200).json({message:"Update success!"})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }
    async delete(req, res, next){
        try{
            const {id} = req.params

            const vac = await Vacancy.findOne({where:{id}})
            if(req.user.id !==  vac.userId){
                return res.status(403).json({message:"Ошибка доступа"})
            }
            await Description.destroy(
                {
                    where:{vacancyId:id}
                }
            )
            await Vacancy.destroy(
                {
                    where: {id}
                })
            return res.status(200).json({message:"Delete success!"})
        }catch (e){
            next(ApiError.badRequest(e.message))
        }
    }

}

module.exports = new VacancyController()
