import { useState } from 'react';
import './InputMessage.css';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useUserValue } from '../../../context/UserContext/useUserContext';
import { MessageType, SentMessage } from '../../../types';
import messageServices from '../../../services/message';
import { socket } from '../../../socket';

type InputMessageProps = {
    recipientId: string | undefined;
};

function InputMessage({ recipientId }: InputMessageProps) {
    const [userInput, setUserInput] = useState('');
    const queryClient = useQueryClient();
    const user = useUserValue();

    const mutation = useMutation({
        mutationFn: (newMessage: SentMessage) => messageServices.create(newMessage),
        onSuccess: (message) => {
            const messages = queryClient.getQueryData<MessageType[]>(['userMessages']) || [];
            queryClient.setQueryData(['userMessages'], [...messages, message]);
            setUserInput('');
            // queryClient.invalidateQueries({ queryKey: ['userMessages'] });
        },
        onError: (e) => {
            console.log(e);
        },
    });

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!userInput || !user) return;

        const newMessage = {
            chatId: 1,
            senderId: user.user.id,
            message: userInput,
        };
        mutation.mutate(newMessage);

        socket.emit('message', {
            recipientId: recipientId,
            message: newMessage,
        });
    };

    return (
        <form className="input-message" onSubmit={handleSubmit}>
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
