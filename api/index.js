import axios from 'axios';

// Base API instance
const api = axios.create({
    baseURL: process.env.API_URL,
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json',
    },
});

export default api;
