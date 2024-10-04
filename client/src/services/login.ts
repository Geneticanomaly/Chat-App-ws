import axios from 'axios';
const baseUrl = 'http://localhost:3000/login';

const loginUser = async (email: string, password: string) => {
    const payload = {
        email,
        password,
    };
    const res = await axios.post(baseUrl, payload);
    return res.data;
};

export default { loginUser };
