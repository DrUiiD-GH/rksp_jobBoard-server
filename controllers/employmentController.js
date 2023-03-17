const {Employment} = require("../models/models");

class EmploymentController {
    async getEmployment(req, res) {
        const employment = await Employment.findAll()
        return res.jsonp(employment)
    }

}

module.exports = new EmploymentController()