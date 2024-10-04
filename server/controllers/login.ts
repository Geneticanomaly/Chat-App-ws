import { Router, Request, Response } from 'express';
import User from '../models/user';

const loginRouter = Router();

loginRouter.post('/', async (req: Request, res: Response) => {
    const user = await User.findOne({
        where: {
            email: req.body.email,
        },
    });

    const correctPassword = req.body.password === 'secret';

    if (!(user && correctPassword)) {
        res.status(401).json({ error: 'invalid username or password' });
        return;
    }
    res.json(user);
});

export default loginRouter;

// import { RequestHandler } from 'express';
// import User from '../models/user';

// export const login: RequestHandler = async (req, res) => {
//     const user = await User.findOne({
//         where: {
//             email: req.body.email,
//         },
//     });

//     const correctPassword = req.body.password === 'secret';

//     if (!(user && correctPassword)) {
//         res.status(401).json({ error: 'invalid username or password' });
//         return;
//     }

//     res.json(user);
// };
