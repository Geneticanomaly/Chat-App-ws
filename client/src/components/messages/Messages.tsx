import './Messages.css';
import Message from './message/Message';
import { MessageType } from '../../types';
import { v4 as uuidv4 } from 'uuid'; // Import uuid

type MessagesProps = {
    combinedMessages: MessageType[];
};

function Messages({ combinedMessages }: MessagesProps) {
    const allMessages = combinedMessages.sort(
        (a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );
    return (
        <div className="messages">
            {allMessages.map((message) => (
                <Message key={message.id || uuidv4()} message={message} />
            ))}
        </div>
    );
}

export default Messages;
