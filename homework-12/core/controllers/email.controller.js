const { userService } = require('../services');
const { sequelize } = require('../dataBase');
const logger = require('../logger')();

module.exports = {
    activatedAccount: async (req, res, next) => {
        const transaction = await sequelize.transaction();
        try {
            console.log(req.user);
            await userService.updateUser({ id: req.user.id }, {
                activate_status: true,
                activate_token: null
            }, transaction);

            await transaction.commit();

            logger.info('Account Activated');
            res.json('YOUR ACCOUNT ACTIVATED');
        } catch (e) {
            await transaction.rollback();
            next(e);
        }
    },
};
