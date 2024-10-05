import Chat from './chat';
import Message from './message';
import User from './user';

User.hasMany(Chat, { as: 'InitiatedChat', foreignKey: 'userId1' });
User.hasMany(Chat, { as: 'ReceivedChat', foreignKey: 'userId2' });
Chat.belongsTo(User, { as: 'User1', foreignKey: 'userId1' });
Chat.belongsTo(User, { as: 'User2', foreignKey: 'userId2' });

Chat.hasMany(Message, { foreignKey: 'chatId' });
Message.belongsTo(Chat, { foreignKey: 'chatId' });

User.hasMany(Message, { foreignKey: 'senderId' });
Message.belongsTo(User, { foreignKey: 'senderId' });

export default { Chat, Message, User };
