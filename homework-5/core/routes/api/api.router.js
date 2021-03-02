const router = require('express').Router();

const { userRouter } = require('../users');
const { authRouter } = require('../auth');
const { addressRoute } = require('../address');

router.use('/users', userRouter);
router.use('/auth', authRouter);
router.use('/address', addressRoute);

module.exports = router;
