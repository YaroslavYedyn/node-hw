const router = require('express').Router()

const searchController = require('../controller/search.controller')

router.get('/users', searchController.searchUser)


module.exports = router
