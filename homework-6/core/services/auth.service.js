const { models: { OAuth } } = require('../dataBase');

module.exports = {
    getTokenByParams: (access_token, model) => OAuth.findOne({ access_token }).populate(model),
    createTokens: (tokens, user) => OAuth.create({ ...tokens, id: user._id }),
    deleteTokensByParams: (params) => OAuth.remove({ params }),
};
