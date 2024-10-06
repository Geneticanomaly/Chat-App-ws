import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { UserContextProvider } from './context/UserContext/UserContext.tsx';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={queryClient}>
        <UserContextProvider>
            <App />
        </UserContextProvider>
    </QueryClientProvider>
);
