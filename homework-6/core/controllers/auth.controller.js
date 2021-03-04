const { authService, userService } = require('../services');
const { errorCode } = require('../Error');
const { tokenizer, passwordHelper } = require('../helpers');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userService.getSingleUser({ email });

            await passwordHelper.compare(password, user.password);

            const tokens = tokenizer();
            await authService.createTokens(tokens, user);

            res.json(tokens);
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },
    logoutUser: async (req, res) => {
        try {
            const token = req.get('Authorization');

            await authService.deleteTokensByParams({ access_token: token });

            res.json(204);
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },
    refreshToken: async (req, res) => {
        try {
            const refresh_token = req.get('Authorization');

            await authService.deleteTokensByParams({ refresh_token });

            const tokens = tokenizer();
            await authService.createTokens(tokens, req.user_id);

            res.json(tokens);
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    }
};
