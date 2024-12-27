import { createContext, useContext, useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const ApiContext = createContext()

export const ApiContextProvider = ({ children }) => {

    const [accessToken, setAccessToken] = useState({});
    const [tokenExpiryTime, setTokenExpiryTime] = useState(null);
    const navigate = useNavigate();

    const fetchAccessToken = async () => {
        try {
            const apiUrl = import.meta.env.VITE_ACCESSTOKEN_API;
            const response = await axios.get(apiUrl);
            const token = response.data.accessToken;
            const expiryTime = new Date().getTime() + 20 * 60 * 1000; // 20 minutes from now

            setAccessToken(token);
            setTokenExpiryTime(expiryTime);
        } catch (error) {
            console.error("Failed to fetch access token:", error);
        }
    };

    useEffect(() => {
        fetchAccessToken();
    }, []);

    useEffect(() => {
        if (tokenExpiryTime) {
          const timer = setTimeout(() => {
            alert("Session has expired. You will be redirected to the home page.");
            navigate('/'); // Redirect to home page
          }, tokenExpiryTime - new Date().getTime());
    
          return () => clearTimeout(timer); // Clear timer if component unmounts or token is refreshed
        }
      }, [tokenExpiryTime, navigate]);

    return (
        <ApiContext.Provider value={{}}>
            {children}
        </ApiContext.Provider>
    )
}

export const ApiAccess = () => {
    return useContext(ApiContext)
}