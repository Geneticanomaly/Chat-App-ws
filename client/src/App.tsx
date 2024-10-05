import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Home from './pages/Home';
import Navbar from './components/Navbar';
import Chat from './pages/chat/Chat';

function App() {
    return (
        <div>
            <Router>
                <Navbar />
                <Routes>
                    <Route path="/" element={<Login />} />
                </Routes>
                <Routes>
                    <Route path="/home" element={<Home />} />
                </Routes>
                <Routes>
                    <Route path="/chat/:id" element={<Chat />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;
