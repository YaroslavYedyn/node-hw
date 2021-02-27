const router = require('express').Router();

const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.get('/', userController.findUsers);
router.post('/', userMiddleware.checkUserIsValid, userController.createUser);
router.patch('/', userMiddleware.checkUpdateUserIsValid, userController.updateUser);
router.put('/', userMiddleware.checkUpdateUserIsValid, userController.updateUsers);
router.get('/:userId', userMiddleware.checkIdIsValid, userController.findSingleUser);
router.delete('/:userId', userMiddleware.checkIdIsValid, userController.removeUser);

module.exports = router;
