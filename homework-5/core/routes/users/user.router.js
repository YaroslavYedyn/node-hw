const router = require('express').Router();

const { userController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');

router.get('/', userController.findUser);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);
router.patch('/', userMiddleware.checkIsUserUpdateValid, userController.updateUser);
router.get('/:id', userMiddleware.checkIsIdValid, userController.getSingleUser);
router.delete('/:id', userMiddleware.checkIsIdValid, userController.removeUser);

module.exports = router;
