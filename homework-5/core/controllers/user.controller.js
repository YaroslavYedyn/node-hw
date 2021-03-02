const { errorCode, successMessage } = require('../constants');
const { passwordHelper } = require('../helpers');
const { userService } = require('../services');

module.exports = {
    findUser: async (req, res) => {
        try {
            const users = await userService.findUser(req.query);
            res.json(users);
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const user = await userService.getSingleUser(req.params.id);
            res.json(user);
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const { password, preferL = 'en' } = req.body;
            const hashPassword = await passwordHelper.hash(password);
            await userService.createUser({ ...req.body, password: hashPassword });
            res.json(successMessage.CREATE_USER[preferL]);
        } catch (e) {
            res.status(errorCode.TEAPOT).json(e.message);
        }
    },
    updateUser: async (req, res) => {
        try {
            const { preferL = 'en' } = req.body;
            await userService.updateUser(req.query, req.body);
            res.json(successMessage.UPDATE_USER[preferL]);
        } catch (e) {
            res.status(errorCode.TEAPOT).json(e.message);
        }
    },
    removeUser: async (req, res) => {
        try {
            await userService.removeUser(req.params.id);
            res.json(successMessage.REMOVE_USER.default);
        } catch (e) {
            res.status(errorCode.TEAPOT).json(e.message);
        }
    },
};
