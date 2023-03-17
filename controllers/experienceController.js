const {Experience} = require("../models/models");

class ExperienceController{
    async getExperience(req, res){
        const experience = await Experience.findAll()
        return res.json(experience)
    }

}

module.exports = new ExperienceController()