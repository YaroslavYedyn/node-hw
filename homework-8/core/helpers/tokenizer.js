const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config');

module.exports = () => {
    const access_token = jwt.sign({}, JWT_SECRET, { expiresIn: '5m' });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET, { expiresIn: '30h' });
    return {
        access_token,
        refresh_token
    };
};
