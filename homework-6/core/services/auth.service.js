const { models: { OAuth } } = require('../dataBase');

module.exports = {
    getTokenByParams: (param, model) => OAuth.findOne(param).populate(model),
    createTokens: (tokens, id) => OAuth.create({ ...tokens, user_id: id }),
    deleteTokensByParams: (params) => OAuth.deleteOne(params),
};
