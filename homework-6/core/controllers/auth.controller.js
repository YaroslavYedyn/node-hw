const { authService, userService } = require('../services');
const { errorCode } = require('../constants');
const { tokenizer } = require('../helpers');
const { passwordHelper } = require('../helpers');

module.exports = {
    loginUser: async (req, res) => {
        try {
            const { email, password } = req.body;
            const user = await userService.getSingleUser({ email });

            await passwordHelper.compare(password, user.password);

            const tokens = tokenizer();

            await authService.createTokens(tokens, user);

            res.json(tokens);
        } catch (e) {
            res.status(errorCode.BAD_REQUEST).json(e.message);
        }
    },
};
