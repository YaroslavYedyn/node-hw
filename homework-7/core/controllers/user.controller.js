const { emailActions } = require('../constants');
const { successMessage } = require('../Error');
const { passwordHelper } = require('../helpers');
const { userService, authService, emailService } = require('../services');

module.exports = {
    findUser: async (req, res, next) => {
        try {
            const users = await userService.findUser(req.query);

            res.json(users);
        } catch (e) {
            next(e);
        }
    },
    getSingleUser: async (req, res, next) => {
        try {
            const user = await userService.getSingleUser({ _id: req.params.id });

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
    createUser: async (req, res, next) => {
        try {
            const { password, email } = req.user;
            const hashPassword = await passwordHelper.hash(password);

            const user = await userService.createUser({ ...req.user, password: hashPassword });

            await emailService.sendMail(email, emailActions.ACTIVATE, {
                name: req.body.name,
                token: user.activate_token
            });

            res.status(200).json('Please check email');
        } catch (e) {
            next(e);
        }
    },
    updateUser: async (req, res, next) => {
        try {
            await userService.updateUser(req.query, req.body);

            res.json(successMessage.UPDATE);
        } catch (e) {
            next(e);
        }
    },
    forgotPassword: async (req, res, next) => {
        try {
            const { new_password, email } = req.body;
            const newHashPassword = await passwordHelper.hash(new_password);

            await userService.updateUser({ email }, { password: newHashPassword });

            res.json(successMessage.UPDATE);
        } catch (e) {
            next(e);
        }
    },
    removeUser: async (req, res, next) => {
        try {
            console.log('remove');
            const { email, name } = req.user;
            await userService.removeUser(req.params.id);
            await authService.deleteTokensByParams({ user_id: req.params.id });

            await emailService.sendMail(email, emailActions.DELETE, { name });

            res.json(successMessage.REMOVE);
        } catch (e) {
            next(e);
        }
    },
};
