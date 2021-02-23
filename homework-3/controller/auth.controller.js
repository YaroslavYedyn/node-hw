const authService = require('../service/auth.service');

module.exports = {
    login: (req, res) => {
        try {
            const {username, password} = req.body;
            console.log(req.body);
            authService.login(username, password)
        } catch (e) {
            res.json(e.message)
        }
    }
}
