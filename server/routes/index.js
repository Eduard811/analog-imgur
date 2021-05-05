const Router = require('express')
const router = new Router()
const authRoute = require('./authRoute')
const postRoute = require('./postRoute')

router.use('/auth', authRoute)
router.use('/post', postRoute)

module.exports = router
