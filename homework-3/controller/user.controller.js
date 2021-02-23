const userService = require('../service/user.service')

module.exports = {
    getAllUsers: (req, res) => {
        const users = userService.findUsers()
        res.json(users);
    },
    getSingleUser: (req, res) => {
        const {userId} = req.params
        const user = userService.findUserById(userId)
        res.json(user)
    },
    createUser: (req, res) => {
        const newUser = req.body
        const user = userService.createUser(newUser)
        return 'Done'

    },
    removeUser: (req, res) => {
        const userId = req.body.userId
        userService.removeUser(userId)
        res.status(201).json('users is created')
    },
    findUser: (req, res) => {
        console.log('sadsad');
        res.status(201).json('users is created')
    }
}
