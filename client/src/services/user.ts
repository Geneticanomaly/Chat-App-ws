import axios from 'axios';
const baseUrl = 'http://localhost:3000/users';

const getAll = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};

const getUser = async (userId: string | null) => {
    const res = await axios.get(`${baseUrl}/${userId}`);
    return res.data;
};

export default { getAll, getUser };
