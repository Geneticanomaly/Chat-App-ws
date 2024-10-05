import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/user';
import { useNavigate } from 'react-router-dom';

type Chat = {
    id: number;
    userId1: string;
    userId2: string;
    createdAt: string;
    updatedAt: string;
};

type User = {
    id: number;
    email: string;
    username: string;
    createdAt: string;
    updatedAt: string;
    chats: Chat[];
};

function Home() {
    const navigate = useNavigate();

    const { isPending, error, data } = useQuery({
        queryKey: ['usersData'],
        queryFn: () => getUsers(),
    });

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>{`An error occurred ${error.message}`}</div>;

    console.log(data);

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
