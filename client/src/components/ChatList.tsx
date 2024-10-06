import { useNavigate } from 'react-router-dom';
import { Chat } from '../types';

type ChatListProps = {
    chats: Chat[];
};

const ChatList = ({ chats }: ChatListProps) => {
    const navigate = useNavigate();
    return (
        <>
            <div style={{ marginTop: '1rem' }}>My chats</div>
            {chats.map((chat: Chat) => (
                <div key={chat.user.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <p>{chat.user.username}</p>
                    <button onClick={() => navigate(`/chat/${chat.user.id}`)}>Chat</button>
                </div>
            ))}
        </>
    );
};

export default ChatList;
