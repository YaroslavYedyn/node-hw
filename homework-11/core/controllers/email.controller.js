const { userService } = require('../services');
const { sequelize } = require('../dataBase');

module.exports = {
    activatedAccount: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            await userService.updateUser({ id: req.user.id }, {
                activate_status: true,
                activate_token: null
            }, transaction);

            await transaction.commit();
            res.json('YOUR ACCOUNT ACTIVATED');
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
};
