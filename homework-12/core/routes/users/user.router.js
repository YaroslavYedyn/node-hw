const router = require('express')
    .Router();

const { userController } = require('../../controllers');
const { userMiddleware, authMiddleware, fileMiddleware } = require('../../middlewares');
const { magicString: { ROLE } } = require('../../constants');

router.get('/', userController.findUser);
router.post('/',
    fileMiddleware.checkFile,
    fileMiddleware.checkAvatar,
    userMiddleware.checkIsUserValid,
    userController.createUser);
router.patch('/', authMiddleware.checkAccessToken, userMiddleware.checkIsUserUpdateValid, userController.updateUser);

router.get('/:id', userMiddleware.checkIsIdValid, userController.getSingleUser);
router.delete('/:id', userMiddleware.checkIsIdValid, authMiddleware.checkRole([
    ROLE.ADMIN,
    ROLE.SUPER_ADMIN
]), userController.removeUser);

router.patch('/forgot',
    authMiddleware.checkAccessToken,
    userMiddleware.checkIsForgotPasswordValid,
    userController.forgotPassword);

module.exports = router;
