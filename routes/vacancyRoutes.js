const Router = require('express')
const router = new Router()
const vacancyController = require('../controllers/vacancyController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/', vacancyController.create)
router.get('/', vacancyController.getAll)
router.get('/my',authMiddleware, vacancyController.getAllByUserId)
router.get('/:id', vacancyController.getOne)
router.put('/:id', vacancyController.edit)
router.delete('/:id', vacancyController.delete)

module.exports = router