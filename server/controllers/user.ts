import { Router, Request, Response } from 'express';
import UserInstance from '../models/user';
import ChatInstance from '../models/chat';
import models from '../models';
const { User, Chat } = models;
const userRouter = Router();

userRouter.get('/', async (_req: Request, res: Response) => {
    const users = await User.findAll({
        include: [
            {
                model: Chat,
                as: 'InitiatedChats',
            },
            {
                model: Chat,
                as: 'ReceivedChats',
            },
        ],
    });

    // Combine InitiatedChats and ReceivedChats to Chats
    const usersData = users.map((user) => {
        const userWithChats = user as UserInstance & {
            InitiatedChats: ChatInstance[];
            ReceivedChats: ChatInstance[];
        };

        // Combine chats into a single array
        const allChats = [...(userWithChats.InitiatedChats || []), ...(userWithChats.ReceivedChats || [])];
        return {
            id: userWithChats.id,
            email: userWithChats.email,
            username: userWithChats.username,
            createdAt: userWithChats.createdAt,
            updatedAt: userWithChats.updatedAt,
            chats: allChats,
        };
    });

    res.json(usersData);
});

userRouter.post('/', async (req: Request, res: Response) => {
    const user = await User.create(req.body);
    res.json(user);
});

userRouter.get('/:id', async (req: Request, res: Response) => {
    const user = await User.findByPk(req.params.id);
    res.json(user);
});

export default userRouter;

// export const getUsers: RequestHandler = async (_req, res) => {
//     const users = await User.findAll();
//     res.json(users);
// };

// export const createUser: RequestHandler = async (req, res) => {
//     const user = await User.create(req.body);
//     res.json(user);
// };
