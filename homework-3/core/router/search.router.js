const router = require('express').Router();

const searchController = require('../controller/search.controller');
const searchMiddleware = require('../middleware/seacrh.middleware');


router.get('/users', searchMiddleware.checkIsValid, searchController.searchUser);


module.exports = router;
