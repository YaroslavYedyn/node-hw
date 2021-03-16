const router = require('express').Router();

const { addressRoute } = require('../address');
const { authRouter } = require('../auth');
const { emailRouter } = require('../email');
const { userRouter } = require('../users');

router.use('/address', addressRoute);
router.use('/auth', authRouter);
router.use('/email', emailRouter);
router.use('/users', userRouter);

module.exports = router;
