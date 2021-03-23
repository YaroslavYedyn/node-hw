module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable(
            'users',
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                name: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: true,
                },
                age: {
                    type: Sequelize.DataTypes.INTEGER,
                    allowNull: true,
                },
                email: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: true,
                    unique: true,
                },
                password: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: true
                },
                activate_token: {
                    type: Sequelize.DataTypes.STRING,
                },
                activate_status: {
                    type: Sequelize.DataTypes.BOOLEAN,
                    defaultValue: false
                },
                avatar: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: true
                },
            }
        );
    },

    down: async (queryInterface) => {
        /**
         * Add reverting commands here.
         *
         * Example:
         * await queryInterface.dropTable('users');
         */
        await queryInterface.dropTable('users');
    }
};
