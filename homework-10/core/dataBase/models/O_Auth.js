const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../index');

class O_Auth extends Model {
}

O_Auth.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    access_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    refresh_token: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    user_id: {
        type: DataTypes.STRING,
        allowNull: true
    }
}, { sequelize });

module.exports = O_Auth;
