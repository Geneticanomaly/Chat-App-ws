import { Link } from 'react-router-dom';
import './Chat.css';
import InputMessage from '../../components/messages/inputMessage/InputMessage';
import Messages from '../../components/messages/Messages';
// import { useQuery } from '@tanstack/react-query';

const Chat = () => {
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
                <Messages />
                <InputMessage />
            </div>
        </>
    );
};

export default Chat;
