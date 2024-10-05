import express from 'express';
import cors from 'cors';
import { PORT } from './util/config';
import { connectToDatabase } from './util/db';
import userRouter from './controllers/user';
import loginRouter from './controllers/login';
import chatRouter from './controllers/chat';
import { app, server } from './socket/socket';
import messageRouter from './controllers/message';

app.use(cors());
app.use(express.json());

app.get('/test', (_req, res) => {
    res.send('HEllo there');
});

app.use('/users', userRouter);
app.use('/login', loginRouter);
app.use('/chats', chatRouter);
app.use('/messages', messageRouter);

server.listen(PORT, async () => {
    await connectToDatabase();
    console.log(`Server running on port ${PORT}`);
});
