const router = require('express').Router();

const { userController } = require('../../controllers');
const { userMiddleware, authMiddleware, fileMiddleware } = require('../../middlewares');

router.get('/', userController.findUser);
router.post('/',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.checkIsUserValid,
    userController.createUser);
router.patch('/', authMiddleware.checkAccessToken, userMiddleware.checkIsUserUpdateValid, userController.updateUser);
router.get('/:id', userMiddleware.checkIsIdValid, userController.getSingleUser);
router.delete('/:id', userMiddleware.checkIsIdValid, userController.removeUser);
router.patch('/forgot',
    authMiddleware.checkAccessToken,
    userMiddleware.checkIsForgotPasswordValid,
    userController.forgotPassword);

module.exports = router;
