const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../index');
const User = require('./User');

class Address extends Model {}

Address.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    city: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    street: {
        type: DataTypes.STRING,
        allowNull: true,
    },
}, { sequelize });

Address.belongsTo(User, { foreignKey: 'userId' });

module.exports = Address;
