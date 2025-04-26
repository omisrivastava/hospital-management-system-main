import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const Context = createContext({
    isAuthenticated: false,
});

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [user]);

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const response = await axios.get(
                    "http://localhost:5003/api/v1/user/patient/me",
                    {
                        withCredentials: true,
                    }
                );
                setIsAuthenticated(true);
                setUser(response.data.user);

            } catch (error) {
                console.error("Error fetching user data:", error);
                setIsAuthenticated(false);
                setUser({});
            }
        };
        fetchUser();
    }, [isAuthenticated]);

    return (
        <Context.Provider
            value={{
                isAuthenticated,
                setIsAuthenticated,
                user,
                setUser
            }}
        >
            {children}
        </Context.Provider>
    );
};

export default AuthProvider;