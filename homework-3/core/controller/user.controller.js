const userService = require('../service/user.service');
const statusCode = require('../constant/errorCodes.enum')

module.exports = {
    getAllUsers: (req, res) => {
        try {
            const {preferL} = req.body;
            console.log(preferL);
            const users = userService.findUsers(req.query);
            res.json(users);
        } catch (e) {
            res.status(418).json(e.message)
        }
    },

    getSingleUser: (req, res) => {
        try {
            const {preferL} = req.body;
            const {userId} = req.params;
            const user = userService.findUserById(userId,preferL);
            res.json(user);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    createUser: (req, res) => {
        try {
            const newUser = req.body;
            const user = userService.createUser(newUser);
            res.status(201).json('users is created').end();
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    updateUser: (req, res) => {
        try {
            const users = userService.updateUser(req.params.id, req.body);
            res.json(users);
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    },

    removeUser: (req, res) => {
        try {
            const {userId} = req.params;
            userService.removeUser(userId);
            res.status(201).json('users is remove');
        } catch (e) {
            res.status(statusCode.BAD_REQUEST).json(e.message);
        }
    }
}
