import { Router } from 'express';
import User from '../models/user';

const userRouter = Router();

userRouter.get('/', async (_req, res) => {
    const users = await User.findAll();
    res.json(users);
});

// userRouter.post('/', async (req, res) => {

// })

export default userRouter;
