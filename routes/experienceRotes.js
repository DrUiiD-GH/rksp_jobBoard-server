const Router = require('express')
const router = new Router()
const experienceController = require('../controllers/experienceController')

router.get('/', experienceController.getExperience)

module.exports = router