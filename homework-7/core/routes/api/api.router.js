const router = require('express').Router();

const { authRouter } = require('../auth');
const { addressRoute } = require('../address');
const { userRouter } = require('../users');

router.use('/auth', authRouter);
router.use('/address', addressRoute);
router.use('/users', userRouter);

module.exports = router;
