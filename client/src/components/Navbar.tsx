import { useNavigate } from 'react-router-dom';

const Navbar = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
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
