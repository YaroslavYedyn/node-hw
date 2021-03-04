const router = require('express').Router();

const { userController } = require('../../controllers');
const { userMiddleware, authMiddleware } = require('../../middlewares');

router.get('/', userController.findUser);
router.post('/', userMiddleware.checkIsUserValid, userController.createUser);
router.patch('/', authMiddleware.checkAccessToken, userMiddleware.checkIsUserUpdateValid, userController.updateUser);
router.get('/:id', userMiddleware.checkIsIdValid, userController.getSingleUser);
router.delete('/:id', authMiddleware.checkAccessToken, userMiddleware.checkIsIdValid, userController.removeUser);

module.exports = router;
