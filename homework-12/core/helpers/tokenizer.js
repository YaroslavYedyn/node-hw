const jwt = require('jsonwebtoken');

const { JWT_SECRET, JWT_REFRESH_SECRET } = require('../config');

module.exports = (role) => {
    const access_token = jwt.sign({}, JWT_SECRET[role], { expiresIn: '5m' });
    const refresh_token = jwt.sign({}, JWT_REFRESH_SECRET[role], { expiresIn: '30h' });
    return {
        access_token,
        refresh_token
    };
};
