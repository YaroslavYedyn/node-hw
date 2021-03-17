const { OAuthModel } = require('../dataBase/models');

module.exports = {
    getTokenByParams: (param) => OAuthModel.findOne({ where: param }),
    createTokens: (tokens, user) => OAuthModel.create({ ...tokens, user_id: user.id }),
    deleteTokensByParams: (params) => OAuthModel.destroy({ where: params }),
};
