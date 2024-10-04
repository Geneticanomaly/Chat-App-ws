const { DataTypes, UUIDV4 } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('users', {
            id: {
                type: DataTypes.UUID,
                defaultValue: UUIDV4,
                primaryKey: true,
            },
            email: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            username: {
                type: DataTypes.STRING,
                allowNull: false,
                unique: true,
            },
            created_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
            updated_at: {
                allowNull: false,
                type: DataTypes.DATE,
                defaultValue: DataTypes.NOW,
            },
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('users');
    },
};
