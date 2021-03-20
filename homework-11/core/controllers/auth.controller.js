const { authService } = require('../services');
const { tokenizer, passwordHelper } = require('../helpers');

module.exports = {
    loginUser: async (req, res, next) => {
        try {
            const { user, body: { password } } = req;

            await authService.deleteTokensByParams({ user_id: user.id });

            await passwordHelper.compare(password, user.password);

            const tokens = tokenizer();
            await authService.createTokens(tokens, user);

            res.status(200).json(tokens);
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
