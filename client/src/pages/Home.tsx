import { useQuery } from '@tanstack/react-query';
import userServices from '../services/user';
import chatServices from '../services/chat';
import UserList from '../components/UserList';
import ChatList from '../components/ChatList';
import { useUserDispatch, useUserValue } from '../context/UserContext/useUserContext';
import { useEffect } from 'react';

function Home() {
    const user = useUserValue();
    const userDispatch = useUserDispatch();
    console.log('user', user);

    useEffect(() => {
        const getCurrentUser = async () => {
            // Could store userId in cookie and make a get request
            const loggedUserJSON = window.localStorage.getItem('loggedInUser');
            if (loggedUserJSON) {
                const user = JSON.parse(loggedUserJSON);
                // const userData = await userServices.getUser(user.user.id);
                userDispatch({ type: 'SET', payload: user });
            }
        };
        if (!user) getCurrentUser();
    }, [user, userDispatch]);

    const {
        isPending: isUsersLoading,
        error: usersError,
        data: users,
    } = useQuery({
        queryKey: ['usersData'],
        queryFn: () => userServices.getAll(),
        staleTime: 5 * 60 * 1000,
    });

    const {
        isPending: isChatsLoading,
        error: chatsError,
        data: chats,
    } = useQuery({
        queryKey: ['chats'],
        queryFn: () => {
            if (user?.user.id) {
                return chatServices.getUserChats(user.user.id);
            }
            return Promise.reject(new Error('User ID is not defined'));
        },
        staleTime: 5 * 60 * 1000,
    });

    if (isUsersLoading) return <div>Loading...</div>;
    if (usersError || chatsError) return <div>An error occurred</div>;

    return (
        <div>
            <h2>Hey {user?.user.username}</h2>
            <UserList users={users} />
            <hr />
            {!isChatsLoading ? <ChatList chats={chats} /> : <div>Loading...</div>}
        </div>
    );
}
export default Home;
