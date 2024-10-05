import { Router, Request, Response } from 'express';
import models from '../models';
const { User } = models;

const userRouter = Router();

userRouter.get('/', async (_req: Request, res: Response) => {
    const users = await User.findAll();
    res.json(users);
});

userRouter.post('/', async (req: Request, res: Response) => {
    const user = await User.create(req.body);
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
