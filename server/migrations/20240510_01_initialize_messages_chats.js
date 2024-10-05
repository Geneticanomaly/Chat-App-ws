const { DataTypes } = require('sequelize');

module.exports = {
    up: async ({ context: queryInterface }) => {
        await queryInterface.createTable('chats', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            user_id1: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            user_id2: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        });
        await queryInterface.createTable('messages', {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            chat_id: {
                type: DataTypes.INTEGER,
                allowNull: false,
                references: {
                    model: 'chats',
                    key: 'id',
                },
            },
            sender_id: {
                type: DataTypes.UUID,
                allowNull: false,
                references: {
                    model: 'users',
                    key: 'id',
                },
            },
            message: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            is_read: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: false,
            },
            created_at: DataTypes.DATE,
            updated_at: DataTypes.DATE,
        });
    },
    down: async ({ context: queryInterface }) => {
        await queryInterface.dropTable('chats');
        await queryInterface.dropTable('messages');
    },
};
