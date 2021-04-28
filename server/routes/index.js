const Router = require('express')
const router = new Router()
const authRoute = require('./authRoute')

router.use('/auth', authRoute)

module.exports = router
