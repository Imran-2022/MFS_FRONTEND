import { createContext, useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [user, setUser] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(localStorage.getItem("user"));
        if (storedUser) setUser(storedUser);
        else navigate('/');
    }, []);

    const login = (inputs) => {
        const { identifier, pin } = inputs;
        fetch(`${import.meta.env.VITE_ENDPOINT}/user/auth`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ identifier, pin }),
        })
            .then(res => res.json())
            .then(data => {
                setUser(data);
                localStorage.setItem("user", JSON.stringify(data));
                if (data.user.accountType=="User") {
                    navigate(`/user`);
                }
                else if (data.user.accountType=='Agent'){
                    navigate('/agent');
                }else if(data.user.accountType=="Admin"){
                    navigate('/admin');
                }
            })
            .catch(error => {
                console.error('Error during login:', error);
            });
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem("user");
        navigate('/');
    };
    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
