const router = require('express').Router();

router.all('*', ((req, res) => res.json('Router not found!')));

module.exports = router;
