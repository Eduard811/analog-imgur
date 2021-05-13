const Router = require('express')
const router = new Router()
const userRoute = require('./userRoute')
const postRoute = require('./postRoute')

router.use('/auth', userRoute)
router.use('/post', postRoute)

module.exports = router
