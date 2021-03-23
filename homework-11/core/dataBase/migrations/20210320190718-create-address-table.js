module.exports = {
    up: async (queryInterface, Sequelize) => {
        /**
         * Add altering commands here.
         *
         * Example:
         * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
         */
        await queryInterface.createTable(
            'addresses',
            {
                id: {
                    type: Sequelize.DataTypes.INTEGER,
                    primaryKey: true,
                    autoIncrement: true,
                },
                city: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: true,
                },
                street: {
                    type: Sequelize.DataTypes.STRING,
                    allowNull: true,
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
        await queryInterface.dropTable('addresses');
    }
};
