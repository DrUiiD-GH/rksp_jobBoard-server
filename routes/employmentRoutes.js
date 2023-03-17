const Router = require('express')
const router = new Router()
const employmentController = require('../controllers/employmentController')

router.get('/', employmentController.getEmployment)

module.exports = router