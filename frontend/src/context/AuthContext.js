import React, { createContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const checkLoginStatus = async () => {
        try {
            const response = await fetch('http://localhost:3001/api/auth/check-status', {
                method: 'GET',
                credentials: 'include'
            });
            const data = await response.json();
            setIsLoggedIn(data.isLoggedIn);
        } catch (error) {
            console.error('Error checking login status:', error);
        }
    };

    useEffect(() => {
        checkLoginStatus();
    }, []);

    return (
        <AuthContext.Provider value={{ isLoggedIn,setIsLoggedIn, checkLoginStatus }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
