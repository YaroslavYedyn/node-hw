const { userService } = require('../services');
const { passwordHelper } = require('../helpers');

module.exports = {
    findUser: async (req, res) => {
        try {
            const users = await userService.findUser(req.query);
            res.json(users);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },
    getSingleUser: async (req, res) => {
        try {
            const user = await userService.getSingleUser(req.params.id);
            res.json(user);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },
    createUser: async (req, res) => {
        try {
            const { password } = req.body;
            const hashPassword = await passwordHelper.hash(password);
            await userService.createUser({ ...req.body, password: hashPassword });
            res.json('User created');
        } catch (e) {
            res.status(401).json(e.message);
        }
    },
    updateUser: async (req, res) => {
        try {
            await userService.updateUser(req.query, req.body);
            res.json('User Updated');
        } catch (e) {
            res.status(401).json(e.message);
        }
    },
    removeUser: async (req, res) => {
        try {
            await userService.removeUser(req.params.id);
            res.json('User remove');
        } catch (e) {
            res.status(401).json(e.message);
        }
    },
};
