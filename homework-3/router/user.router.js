const router = require('express').Router();

const userController = require('../controller/user.controller')
const userMiddleware = require('../middleware/user.middleware')

router.get('/', userController.getAllUsers);
router.post('/', userMiddleware.isUserValid, userController.createUser);
router.get('/:userId', userController.getUserById)

module.exports = router;
