import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import loginServices from '../services/login';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            const user = await loginServices.loginUser(email, password);
            window.localStorage.setItem('loggedInUser', JSON.stringify(user));
            setEmail('');
            setPassword('');
            navigate('/home');
        } catch (e) {
            console.log(e);
        }
    };
    return (
        <div>
            <h2>Login to application</h2>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div>
                    Email <input type="text" onChange={(e) => setEmail(e.target.value)} />
                </div>
                <div>
                    Password <input type="text" onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button>Login</button>
            </form>
        </div>
    );
};

export default Login;
