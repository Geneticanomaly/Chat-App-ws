import express from 'express';
import cors from 'cors';
import { PORT } from './util/config';
import { connectToDatabase } from './util/db';
import userRouter from './controllers/user';
import loginRouter from './controllers/login';
const app = express();

app.use(cors());
app.use(express.json());

app.get('/test', (_req, res) => {
    res.send('HEllo there');
});

app.use('/users', userRouter);
app.use('/login', loginRouter);

app.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Server running on port ${PORT}`);
});
