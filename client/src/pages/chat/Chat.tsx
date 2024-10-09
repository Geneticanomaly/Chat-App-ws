import { Link, useParams } from 'react-router-dom';
import './Chat.css';
import InputMessage from '../../components/messages/inputMessage/InputMessage';
import Messages from '../../components/messages/Messages';
import { useUserValue } from '../../context/UserContext/useUserContext';
import { useQuery } from '@tanstack/react-query';
import messageServices from '../../services/message';

const Chat = () => {
    const user = useUserValue();
    const { id } = useParams<{ id: string }>();

    const {
        isLoading,
        error,
        data: userMessages,
    } = useQuery({
        queryKey: ['userMessages'],
        queryFn: () => messageServices.getAll(user?.user.id),
        staleTime: 5 * 60 * 1000,
    });

    const {
        isLoading: otherLoading,
        error: otherError,
        data: otherUserMessages,
    } = useQuery({
        queryKey: ['otherUserMessages'],
        queryFn: () => messageServices.getAll(id),
        staleTime: 5 * 60 * 1000,
    });

    if (isLoading || otherLoading) return <>Loading...</>;
    if (error || otherError) return <>An error occured</>;

    return (
        <>
            <div className="chat-background"></div>
            <div className="chat-container">
                <header className="chat-header">
                    <div className="chat-header-profile">
                        <Link className="link" to={`/home`}>
                            <img
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MGQQgmEFJiVfNtDP5LG5yLTXIPs6skqeCA&s"
                                className="chat-header-img"
                            />
                        </Link>
                        <p>Some name...</p>
                    </div>

                    <div className="chat-header-icons">
                        <Link to="/home" className="link-icon">
                            <p>Back</p>
                        </Link>
                    </div>
                </header>
                <Messages userMessages={userMessages} otherUserMessages={otherUserMessages} />
                <InputMessage />
            </div>
        </>
    );
};

export default Chat;
