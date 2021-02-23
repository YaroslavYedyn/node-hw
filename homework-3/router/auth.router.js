const router = require('express').Router()

const authController = require('../controller/auth.controller')
const userMiddleware = require('../middleware/user.middleware')

router.post('/',authController.login)
module.exports = router
