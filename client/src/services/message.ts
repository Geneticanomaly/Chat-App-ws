import axios from 'axios';
const baseUrl = 'http://localhost:3000/messages';

const getAll = async (id: string) => {
    const res = await axios.get(`${baseUrl}/${id}`);
    return res.data;
};

const create = async () => {
    const res = await axios.post(baseUrl);
    return res.data;
};

export default { getAll, create };
