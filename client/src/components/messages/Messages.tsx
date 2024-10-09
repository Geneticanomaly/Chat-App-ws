import './Messages.css';
import Message from './message/Message';
import { MessageType } from '../../types';

type MessagesProps = {
    userMessages: MessageType[];
    otherUserMessages: MessageType[];
};

function Messages({ userMessages, otherUserMessages }: MessagesProps) {
    const allMessages = [...userMessages, ...otherUserMessages].sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return (
        <div className="messages">
            {allMessages.map((message) => (
                <Message key={message.id} message={message} />
            ))}
        </div>
    );
}

export default Messages;
