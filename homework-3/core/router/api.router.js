const router = require('express').Router();

const userRouter = require('./user.router');
const searchRouter = require('./search.router');

router.use('/users', userRouter);
router.use('/search', searchRouter);

module.exports = router;
