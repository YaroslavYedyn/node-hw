const { successMessage } = require('../Error');
const { passwordHelper } = require('../helpers');
const { userService, authService } = require('../services');

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
            const { password } = req.body;
            const hashPassword = await passwordHelper.hash(password);

            await userService.createUser({ ...req.body, password: hashPassword });

            res.json(successMessage.CREATE);
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
    removeUser: async (req, res, next) => {
        try {
            await userService.removeUser(req.params.id);
            await authService.deleteTokensByParams({ user_id: req.params.id });

            res.json(successMessage.REMOVE);
        } catch (e) {
            next(e);
        }
    },
};
