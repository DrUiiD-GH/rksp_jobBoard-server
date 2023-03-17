const {Schedule} = require("../models/models");

class ScheduleController{
    async getSchedule(req, res){
        const schedule = await Schedule.findAll()
        return res.json(schedule)
    }
}

module.exports = new ScheduleController()