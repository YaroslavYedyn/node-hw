const jwt = require('jsonwebtoken');

const { JWT_ACTIVATE_SECRET } = require('../config');

module.exports = (role) => jwt.sign({}, JWT_ACTIVATE_SECRET[role], { expiresIn: '5m' });
