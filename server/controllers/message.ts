import { Router, Request, Response } from 'express';
import models from '../models';
const { Message } = models;

const messageRouter = Router();

messageRouter.get('/', async (_req: Request, res: Response) => {
    const messages = await Message.findAll();
    res.json(messages);
});

messageRouter.post('/', async (req: Request, res: Response) => {
    const message = await Message.create(req.body);
    res.json(message);
});

export default messageRouter;
