import { useNavigate } from 'react-router-dom';
import { User } from '../types';

type UserListProps = {
    users: User[];
};

const UserList = ({ users }: UserListProps) => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ marginTop: '1rem' }}>Users</div>
            {users.map((user: User) => (
                <div key={user.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{user.username}</p>
                    <button onClick={() => navigate(`/chat/${user.id}`)}>Chat</button>
                </div>
            ))}
        </>
    );
};

export default UserList;
