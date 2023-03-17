const Router = require('express')
const router = new Router()
const vacancyController = require('../controllers/vacancyController')
const authMiddleware = require('../middleware/authMiddleware')

router.post('/',authMiddleware, vacancyController.create)
router.get('/', vacancyController.getAll)
router.get('/my',authMiddleware, vacancyController.getAllByUserId)
router.get('/:id', vacancyController.getOne)
router.put('/:id',authMiddleware, vacancyController.edit)
router.delete('/:id',authMiddleware, vacancyController.delete)

module.exports = router