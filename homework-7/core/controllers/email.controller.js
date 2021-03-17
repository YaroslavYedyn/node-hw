const { userService } = require('../services');

module.exports = {
    activatedAccount: async (req, res, next) => {
        try {
            await userService.updateUser({ _id: req.user._id }, { activate_status: true, activate_token: null });

            res.json('YOUR ACCOUNT ACTIVATED');
        } catch (e) {
            next(e);
        }
    },
};
