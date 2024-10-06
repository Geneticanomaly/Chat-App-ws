import { Router, Request, Response } from 'express';
import ChatInstance from '../models/chat';
import models from '../models';
const { Chat, Message, User } = models;
import 'express-async-errors';
import { Op } from 'sequelize';
import UserInstance from '../models/user';

const chatRouter = Router();

chatRouter.get('/', async (_req: Request, res: Response) => {
    const chats = await Chat.findAll();
    res.json(chats);
});

chatRouter.post('/', async (req: Request, res: Response) => {
    const chat = await Chat.create(req.body);
    res.json(chat);
});

chatRouter.get('/:id', async (req: Request, res: Response) => {
    const chat = await Chat.findByPk(req.params.id, {
        include: [
            {
                model: Message,
            },
        ],
    });
    res.json(chat);
});

chatRouter.get('/user/:id', async (req: Request, res: Response) => {
    const userId = req.params.id;

    const userChats = await Chat.findAll({
        where: {
            [Op.or]: [{ userId1: userId }, { userId2: userId }],
        },
        include: [
            {
                model: User,
                as: 'User1',
                attributes: ['id', 'username', 'email'],
            },
            {
                model: User,
                as: 'User2',
                attributes: ['id', 'username', 'email'],
            },
        ],
    });

    const chats = userChats.map((chat) => {
        const chatData = chat as ChatInstance & {
            User1: UserInstance;
            User2: UserInstance;
        };

        const otherUser = chatData.userId1 === userId ? chatData.User2 : chatData.User1;

        return {
            id: chatData.id,
            createdAt: chatData.createdAt,
            updatedAt: chatData.updatedAt,
            user: otherUser,
        };
    });

    if (userChats.length !== 0) res.json(chats);
    else res.status(404).json({ error: 'User has no available chats' });
});

export default chatRouter;
