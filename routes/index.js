const Router = require('express')
const router = new Router()
const userRoutes = require('./userRoutes')
const vacancyRoutes = require('./vacancyRoutes')
const categoryRoutes = require('./categoryRoutes')
const employmentRoutes = require('./employmentRoutes')
const experienceRoutes = require('./experienceRotes')
const scheduleRoutes = require('./scheduleRoutes')


router.use('/user', userRoutes)
router.use('/vacancy', vacancyRoutes)
router.use('/category', categoryRoutes)
router.use('/employment', employmentRoutes)
router.use('/experience', experienceRoutes)
router.use('/schedule', scheduleRoutes)


module.exports = router