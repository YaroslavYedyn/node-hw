const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../index');

class Address extends Model {
}

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

module.exports = Address;
