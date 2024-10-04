import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/user';
import { useNavigate } from 'react-router-dom';

type User = {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
};

function Home() {
    const navigate = useNavigate();

    const { isPending, error, data } = useQuery({
        queryKey: ['usersData'],
        queryFn: () => getUsers(),
    });

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>{`An error occurred ${error.message}`}</div>;

    return (
        <div>
            {data.map((user: User) => (
                <div key={user.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{user.username}</p>
                    <button onClick={() => navigate(`/chat/${user.id}`)}>Chat</button>
                </div>
            ))}
        </div>
    );
}
export default Home;
