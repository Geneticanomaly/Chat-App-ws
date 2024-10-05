import { useState } from 'react';
import './InputMessage.css';

function InputMessage() {
    const [userInput, setUserInput] = useState('');

    const handleMessageSent = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('Sent message');
        setUserInput('');
    };

    return (
        <form className="input-message" onSubmit={handleMessageSent}>
            <input
                type="text"
                placeholder="Type something..."
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <div className="send">
                <button className="send-button">Send</button>
            </div>
        </form>
    );
}

export default InputMessage;
