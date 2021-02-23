const userService = require('../service/user.service');

module.exports = {
    getAllUsers: (req, res) => {
        try {
            const users = userService.findUsers();
            res.json(users);
        } catch (e) {
            res.status(418).json(e.message);
        }
    },
    getUserById: (req, res) => {
        const {userId} = req.params;
        const user = userService.findSingleUser(userId)
        res.json(user)
    },
    createUser: (req, res) => {
        const {email, username, password} = req.body
        const newUser = userService.createUser(req.body)
        res.json(newUser)
    }
}
