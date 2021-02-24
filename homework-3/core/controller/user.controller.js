const userService = require('../service/user.service');

module.exports = {
    getAllUsers: (req, res) => {
        try {
            const users = userService.findUsers();
            res.json(users);
        } catch (e) {
            res.status(418).json(e.message)
        }
    },

    getSingleUser: (req, res) => {
        const {userId} = req.params;
        const user = userService.findUserById(userId);
        res.json(user);
    },

    createUser: (req, res) => {
        const newUser = req.body;
        const user = userService.createUser(newUser);
        res.status(201).json('users is created').end();

    },

    updateUser: (req, res) => {
        const users = userService.updateUser(req.params.id, req.body);
        res.json(users);
    },

    removeUser: (req, res) => {
        const {userId} = req.params;
        userService.removeUser(userId);
        res.status(201).json('users is remove');
    }
}
