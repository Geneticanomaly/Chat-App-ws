import axios from 'axios';
import { SentMessage } from '../types';
const baseUrl = 'http://localhost:3000/messages';

const getAll = async (id: string | undefined) => {
    const res = await axios.get(`${baseUrl}/${id}`);
    return res.data;
};

const create = async (message: SentMessage) => {
    const res = await axios.post(baseUrl, message);
    return res.data;
};

export default { getAll, create };
