import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../services/user';
import chatServices from '../services/chat';
import UserList from '../components/UserList';
import ChatList from '../components/ChatList';

function Home() {
    const user = window.localStorage.getItem('loggedInUser');
    const userData = user ? JSON.parse(user) : null;

    const {
        isPending: isUsersLoading,
        error: usersError,
        data: users,
    } = useQuery({
        queryKey: ['usersData'],
        queryFn: () => getUsers(),
        staleTime: 5 * 60 * 1000,
    });

    const {
        isPending: isChatsLoading,
        error: chatsError,
        data: chats,
    } = useQuery({
        queryKey: ['chats'],
        queryFn: () => chatServices.getUserChats(userData.user.id),
        staleTime: 5 * 60 * 1000,
    });

    if (isUsersLoading || isChatsLoading) return <div>Loading...</div>;
    if (usersError || chatsError) return <div>{`An error occurred`}</div>;

    console.log(users);
    console.log(chats);
    return (
        <div>
            <UserList users={users} />
            <hr />
            <ChatList chats={chats} />
        </div>
    );
}
export default Home;
