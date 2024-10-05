import { Link } from 'react-router-dom';
import './Message.css';

function Message() {
    return (
        <div>
            <div className="message-info">
                <Link className="link" to={`/home`}>
                    <img
                        src={`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0MGQQgmEFJiVfNtDP5LG5yLTXIPs6skqeCA&s`}
                        className="message-profile-img"
                    />
                </Link>
                <p>7:21 PM</p>
            </div>
            <div className="message-content"></div>
        </div>
    );
}

export default Message;
