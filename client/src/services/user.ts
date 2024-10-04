import axios from 'axios';
const baseUrl = 'http://localhost:3000/users';

export const getUsers = async () => {
    const res = await axios.get(baseUrl);
    return res.data;
};
