import { useState } from 'react';
import { socket } from './socket';

function App() {
    const [message, setMessage] = useState('');
    const [messages, setMessages] = useState<string[]>([]);

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        socket.emit('message', message);
        setMessage('');
        // setMessages([...messages, message]);
    };

    socket.on('message', (data) => {
        setMessages([...messages, data]);
    });

    return (
        <div
            style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
            }}
        >
            <form className="message-form" onSubmit={(e) => handleSubmit(e)}>
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
        </div>
    );
}

export default App;
