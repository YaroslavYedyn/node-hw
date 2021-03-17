const router = require('express').Router();

const { authController } = require('../../controllers');
const { authMiddleware: { checkRefreshToken, checkAccessToken } } = require('../../middlewares');

router.post('/', authController.loginUser);
router.post('/refresh', checkRefreshToken, authController.refreshToken);
router.post('/logout', checkAccessToken, authController.logoutUser);

module.exports = router;
