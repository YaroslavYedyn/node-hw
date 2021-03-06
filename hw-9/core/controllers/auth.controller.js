const { authService, userService } = require('../services');
const { tokenizer, passwordHelper } = require('../helpers');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { email, password } = req.body;
            const user = await userService.getSingleUser({ email });
            await authService.deleteTokensByParams({ user_id: user._id });

            await passwordHelper.compare(password, user.password);

            const tokens = tokenizer();
            await authService.createTokens(tokens, user);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    },
    logoutUser: async (req, res, next) => {
        try {
            const token = req.get('Authorization');

            await authService.deleteTokensByParams({ access_token: token });

            res.json(204);
        } catch (e) {
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get('Authorization');

            await authService.deleteTokensByParams({ refresh_token });

            const tokens = tokenizer();
            await authService.createTokens(tokens, req.user_id);

            res.json(tokens);
        } catch (e) {
            next(e);
        }
    }
};
