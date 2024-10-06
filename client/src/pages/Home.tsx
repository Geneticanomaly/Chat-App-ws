import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/user';
import { useNavigate } from 'react-router-dom';
import chatServices from '../services/chat';

type User = {
    id: number;
    email: string;
    username: string;
};

type Chat = {
    id: number;
    createdAt: string;
    updatedAt: string;
    user: User;
};

function Home() {
    const navigate = useNavigate();
    const user = window.localStorage.getItem('loggedInUser');
    const userData = user ? JSON.parse(user) : null;

    // const { isPending, error, data } = useQuery({
    //     queryKey: ['usersData'],
    //     queryFn: () => getUsers(),
    // });
    console.log(userData);
    const { isPending, error, data } = useQuery({
        queryKey: ['chats'],
        queryFn: () => chatServices.getUserChats(userData.user.id),
    });

    if (isPending) return <div>Loading...</div>;
    if (error) return <div>{`An error occurred ${error.message}`}</div>;

    console.log(data);

    return (
        <div>
            <div style={{ marginTop: '1rem' }}>My chats</div>
            {data.map((chat: Chat) => (
                <div key={chat.user.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{chat.user.username}</p>
                    <button onClick={() => navigate(`/chat/${chat.user.id}`)}>Chat</button>
                </div>
            ))}
        </div>
    );
}
export default Home;
