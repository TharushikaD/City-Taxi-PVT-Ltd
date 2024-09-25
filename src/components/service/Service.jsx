import axios from "axios";

// Create the Axios instance
const instance = axios.create({
    baseURL: 'http://localhost:8080/v1/users',
});

instance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('authToken'); 

        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

export default instance;
