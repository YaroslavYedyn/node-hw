const userService = require('../service/user.service')
const users = userService.findUsers()
module.exports = {
    isUserValid: (req, res, next) => {
        try {
            const {username, password, email} = req.body
            if (!username || !password || !email) {
                throw new Error('Some filed is empty')
            }
            if (password.length < 8) {
                throw new Error('min length 8')
            }
            if (users.every(value => value.username === username || value.email === email)) {
                throw new Error('such a user exists')
            }
        } catch (e) {
            res.status(400).json(e.message)
        }
    }
}
