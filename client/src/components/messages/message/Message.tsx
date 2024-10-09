import { Link } from 'react-router-dom';
import './Message.css';
import { MessageType } from '../../../types';

type MessageProps = {
    message: MessageType;
};

function Message({ message }: MessageProps) {
    return (
        <>
            <div className="message-info">
                <Link className="link" to={`/home`}>
                    <img
                        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MGQQgmEFJiVfNtDP5LG5yLTXIPs6skqeCA&s`}
                        className="message-profile-img"
                    />
                </Link>
                <p>7:21 PM</p>
            </div>
            <div className="message-content">
                <p className="sent-message">{message.message}</p>
            </div>
        </>
    );
}

export default Message;
