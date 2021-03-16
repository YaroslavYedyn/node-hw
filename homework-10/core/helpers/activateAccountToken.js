const jwt = require('jsonwebtoken');

const { JWT_ACTIVATE_SECRET } = require('../config');

module.exports = () => jwt.sign({}, JWT_ACTIVATE_SECRET, { expiresIn: '5m' });
