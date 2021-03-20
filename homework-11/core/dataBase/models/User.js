const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../index');

class User extends Model {
}

User.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    age: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: true,
        unique: true,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: true
    },
    activate_token: {
        type: DataTypes.STRING,
    },
    activate_status: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    },
    avatar: {
        type: DataTypes.STRING,
        allowNull: true
    },
}, { sequelize });

module.exports = User;
