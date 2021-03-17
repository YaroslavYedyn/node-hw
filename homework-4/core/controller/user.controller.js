const { userService } = require('../service');

module.exports = {
    findUsers: async (req, res) => {
        try {
            const users = await userService.findUsers(req.query);
            res.json(users);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },

    findSingleUser: async (req, res) => {
        try {
            const id = req.params.userId;
            const user = await userService.findUserByID(id);
            res.json(user);
        } catch (e) {
            res.status(404).json(e.message);
        }
    },

    createUser: async (req, res) => {
        try {
            await userService.createUser(req.body);
            res.json('user created');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    updateUser: async (req, res) => {
        try {
            await userService.updateUser(req.query, req.body);
            res.json('User Update');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    updateUsers: async (req, res) => {
        try {
            await userService.updateUsers(req.query, req.body);
            res.json('Users Update');
        } catch (e) {
            res.status(400).json(e.message);
        }
    },

    removeUser: async (req, res) => {
        try {
            const id = req.params.userId;
            await userService.removeUser(id);
            res.json('User remove');
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
