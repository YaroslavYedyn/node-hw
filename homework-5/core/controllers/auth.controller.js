const { authService } = require('../services');
const { models: { User } } = require('../dataBase');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            await authService.login(password, user);
            res.json('User logged in');
        } catch (e) {
            res.status(400).json(e.message);
        }
    }
};
