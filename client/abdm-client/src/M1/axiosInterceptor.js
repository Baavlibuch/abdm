import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL
    // baseURL: "https://abdm.easemymed.com"

});

export default axiosInstance;