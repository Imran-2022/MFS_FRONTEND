import { Outlet } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';

const Root = () => {
    return (
        <AuthProvider>
            <Outlet />
        </AuthProvider>
    );
};

export default Root;