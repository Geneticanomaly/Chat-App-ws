import { useNavigate } from 'react-router-dom';
import { useUserDispatch } from '../context/UserContext/useUserContext';

const Navbar = () => {
    const navigate = useNavigate();
    const userDispatch = useUserDispatch();

    const handleLogout = () => {
        userDispatch({ type: 'CLEAR' });
        window.localStorage.removeItem('loggedInUser');
        navigate('/');
    };
    return (
        <div className="navbar">
            Navbar
            <button onClick={handleLogout}>Logout</button>
        </div>
    );
};

export default Navbar;
