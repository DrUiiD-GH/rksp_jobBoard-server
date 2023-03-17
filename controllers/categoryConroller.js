const {Category} = require("../models/models");


class CategoryController{
    async getCategory(req, res){
        const category = await Category.findAll()
        return res.jsonp(category)
    }

}

module.exports = new CategoryController()