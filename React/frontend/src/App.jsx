import React, { useState, useEffect } from 'react';
import Login from './Login';
import Profile from './Profile';

const App = () => {
    const [token, setToken] = useState(null);

    useEffect(() => {
        const savedToken = localStorage.getItem('token');
        if (savedToken) setToken(savedToken);
    }, []);

    const handleSetToken = (newToken) => {
        setToken(newToken);
        localStorage.setItem('token', newToken);
    };

    const handleLogout = () => {
        setToken(null);
        localStorage.removeItem('token');
    };

    return (
        <div>
            {token ? (
                <div>
                    <Profile token={token} />
                    <button onClick={handleLogout}>Logout</button>
                </div>
            ) : (
                <Login setToken={handleSetToken} />
            )}
        </div>
    );
};

export default App;
