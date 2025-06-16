import React, { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { login as apiLogin, logout as apiLogout } from '../services/api';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const storedUser = localStorage.getItem('user');
        
        if (token && storedUser) {
            try {
                const decoded = jwt_decode(token);
                const currentTime = Date.now() / 1000;
                
                if (decoded.exp > currentTime) {
                    setUser(JSON.parse(storedUser));
                } else {
                    handleLogout();
                }
            } catch (error) {
                handleLogout();
            }
        }
        setLoading(false);
    }, []);

    const handleLogin = async (username, password) => {
        try {
            const response = await apiLogin(username, password);
            setUser({
                username: response.username,
                role: response.role
            });
            navigate('/dashboard');
            return response;
        } catch (error) {
            throw error;
        }
    };

    const handleLogout = () => {
        apiLogout();
        setUser(null);
        navigate('/login');
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <AuthContext.Provider value={{ user, login: handleLogin, logout: handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 