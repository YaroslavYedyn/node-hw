const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { errorMessage } = require('../../Error');
const { JWT_SECRET } = require('../../config');
const { constants: { AUTHORIZATION } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { prefL = 'en' } = req.body;
        const access_token = req.get(AUTHORIZATION);

        if (!access_token) {
            throw new Error(errorMessage.TOKEN_IS_REQUIRED[prefL]);
        }

        jwt.verify(access_token, JWT_SECRET, (error) => {
            if (error) {
                throw new Error(errorMessage.TOKEN_NOT_VALID[prefL]);
            }
        });

        const status = await authService.getTokenByParams({ access_token }, 'user_id');

        if (!status) {
            throw new Error(errorMessage.TOKEN_NOT_VALID[prefL]);
        }

        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
};
