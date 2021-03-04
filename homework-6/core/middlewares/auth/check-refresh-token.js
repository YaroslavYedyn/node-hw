const jwt = require('jsonwebtoken');

const { authService } = require('../../services');
const { errorMessage } = require('../../Error');
const { JWT_REFRESH_SECRET } = require('../../config');
const { constants: { AUTHORIZATION } } = require('../../constants');

module.exports = async (req, res, next) => {
    try {
        const { prefL = 'en' } = req.body;
        const token = req.get(AUTHORIZATION);

        if (!token) {
            throw new Error(errorMessage.TOKEN_IS_REQUIRED[prefL]);
        }

        jwt.verify(token, JWT_REFRESH_SECRET, (error) => {
            if (error) {
                throw new Error(errorMessage.TOKEN_NOT_VALID[prefL]);
            }
        });

        const status = await authService.getTokenByParams({ refresh_token: token }, 'user_id');

        if (!status) {
            throw new Error(errorMessage.TOKEN_NOT_VALID[prefL]);
        }
        req.user_id = status.user_id.id;

        next();
    } catch (e) {
        res.status(400).json(e.message);
    }
};
