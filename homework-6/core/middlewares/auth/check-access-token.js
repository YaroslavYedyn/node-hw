const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { JWT_SECRET } = require('../../config');

module.exports = async (req, res, next) => {
    try {
        const access_token = req.get('Authorization');

        if (!access_token) {
            throw new Error('Token is required');
        }

        jwt.verify(access_token, JWT_SECRET, (error) => {
            if (error) {
                throw new Error('Token not valid!');
            }
        });

        const status = await authService.getTokenByParams(access_token, 'user_id');

        if (!status) {
            throw new Error('Token not valid!');
        }

        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
};
