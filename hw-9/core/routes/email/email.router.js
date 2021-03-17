const router = require('express').Router();

const { emailController } = require('../../controllers');
const { userMiddleware } = require('../../middlewares');

router.get('/activate', userMiddleware.checkIsActivateTokenValid, emailController.activatedAccount);

module.exports = router;
