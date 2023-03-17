const Router = require('express')
const router = new Router()
const categoryController = require('../controllers/categoryConroller')

router.get('/', categoryController.getCategory)

module.exports = router