const { authService } = require('../services');
const { errorCode, successMessage } = require('../constants');
const { models: { User } } = require('../dataBase');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const { email, password, preferL = 'en' } = req.body;
            const user = await User.findOne({ email });
            await authService.login(password, user);
            res.json(successMessage.LOGIN_USER[preferL]);
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    }
};
