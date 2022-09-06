import axios from 'axios';


const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3700/api',   
});

api.defaults.withCredentials = true

// Add request interceptor
api.interceptors.request.use(
    async config => {

        
        config.headers['Content-Type'] = 'application/json';
        config.headers['Accept'] = 'application/json';
        config.withCredentials=true;
        return config;
    },
    error => {
        Promise.reject(error);
    }
);

export default api;