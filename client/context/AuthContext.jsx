import React, { useEffect, useState, createContext } from 'react';

// context to hold user state
export const AuthContext = createContext({
    currentUser: {
        firstName: null,
        lastName: null,
        username: null,
        password: null
    },
    setCurrentUser: () => null,
});

// auth provider to wrap routers
export const AuthProvider = ({ childern }) => {
    const [currentUser, setCurrentUser] = useState();

    const value = { currentUser, setCurrentUser };

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
};
