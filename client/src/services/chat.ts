import axios from 'axios';
const baseUrl = 'http://localhost:3000/chats';

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const getUserChats = async (userId: string) => {
    const res = await axios.get(`${baseUrl}/user/${userId}`);
    return res.data;
};

const create = async (userId1: string, userId2: string) => {
    const payload = {
        userId1,
        userId2,
    };
    const res = await axios.post(baseUrl, payload);
    return res.data;
};

export default { getAll, getUserChats, create };
