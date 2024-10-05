import { useEffect, useState } from 'react';
import { socket } from '../socket';
import { useNavigate } from 'react-router-dom';

function ChatRoom() {
    const navigate = useNavigate();
    const [activity, setActivity] = useState('');
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);
    const [typingTimeout, setTypingTimeout] = useState<NodeJS.Timeout | null>(null); // To store the typing timeout

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('message', message);
        setMessage('');
    };

    useEffect(() => {
        // Handle incoming messages
        socket.on('message', (data) => {
            setActivity('');
            // Use functional state update to access the latest state
            setMessages((prevMessages) => [...prevMessages, data]);
        });

        // Handle typing activity broadcast
        socket.on('activity', (name) => {
            setActivity(`${name} is typing...`);

            // Clear after 3 seconds
            if (typingTimeout) {
                clearTimeout(typingTimeout);
            }

            const timeout = setTimeout(() => {
                setActivity('');
            }, 3000);

            // Save the timeout reference
            setTypingTimeout(timeout);
        });

        // CLeanup
        return () => {
            socket.off('message');
            socket.off('activity');
            if (typingTimeout) clearTimeout(typingTimeout); // Clean up timeout if unmounted
        };
    }, [typingTimeout]);

    useEffect(() => {
        const handleKeyPress = () => {
            socket.emit('activity', socket.id?.substring(0, 5));
        };
        window.addEventListener('keypress', handleKeyPress);
        return () => {
            window.removeEventListener('keypress', handleKeyPress);
        };
    }, []);

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <button onClick={() => navigate('/home')}>Leave</button>
            <form className="message-form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                />
                <button>Send</button>
            </form>
            {messages.map((message, i) => (
                <p key={i} className="message">
                    {message}{' '}
                </p>
            ))}
            {activity && <p className="message">{activity}</p>}
        </div>
    );
}

export default ChatRoom;
