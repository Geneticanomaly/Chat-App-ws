import { Router, Request, Response } from 'express';
import models from '../models';
const { Chat } = models;
import 'express-async-errors';

const chatRouter = Router();

chatRouter.get('/', async (_req: Request, res: Response) => {
    const chats = await Chat.findAll();
    res.json(chats);
});

chatRouter.post('/', async (req: Request, res: Response) => {
    const chat = await Chat.create(req.body);
    res.json(chat);
});

export default chatRouter;
