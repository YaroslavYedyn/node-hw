const { authService } = require('../services');
const { tokenizer, passwordHelper } = require('../helpers');
const { sequelize } = require('../dataBase');

module.exports = {
    loginUser: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const { user, body: { password } } = req;

            await authService.deleteTokensByParams({ user_id: user.id }, transaction);

            await passwordHelper.compare(password, user.password);

            const tokens = tokenizer();
            await authService.createTokens(tokens, user, transaction);

            await transaction.commit();
            res.status(200)
                .json(tokens);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    logoutUser: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const token = req.get('Authorization');

            await authService.deleteTokensByParams({ access_token: token }, transaction);

            await transaction.commit();
            res.json(204);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
    refreshToken: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            const refresh_token = req.get('Authorization');

            await authService.deleteTokensByParams({ refresh_token }, transaction);

            const tokens = tokenizer();
            await authService.createTokens(tokens, req.user_id, transaction);

            await transaction.commit();
            res.json(tokens);
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    }
};
