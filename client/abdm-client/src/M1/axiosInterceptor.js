import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL
    // baseURL: "http://localhost:3000"

});

export default axiosInstance;