import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

const axiosInstance = axios.create({
    // baseURL: process.env.REACT_APP_BASE_URL
    baseURL: "https://serverside-abdm-315394074642.asia-south1.run.app/abdm/api"

});

export default axiosInstance;