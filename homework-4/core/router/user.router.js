const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userController.findUsers);
router.post('/', userMiddleware.checkUserIsValid, userController.createUser);
router.patch('/', userMiddleware.checkUserIsValid, userController.updateUser);
router.get('/:userId', userMiddleware.checkIdIsValid, userController.findSingleUser);
router.delete('/:userId', userMiddleware.checkIdIsValid, userController.removeUser);

module.exports = router;
