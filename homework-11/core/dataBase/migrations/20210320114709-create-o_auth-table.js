module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable(
            'o_auth',
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                access_token: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: true,
                },
                refresh_token: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: true,
                },
                user_id: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: true
                }
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
        await queryInterface.dropTable('o_auth');
    }
};
