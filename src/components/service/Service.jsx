import axios from 'axios';

let token = localStorage.getItem('authToken');
const instance = axios.create({

    baseURL: 'https://ef78-2402-d000-a400-82e1-d145-2268-af67-4a99.ngrok-free.app/city-taxi/v1',

    headers: {
        Authorization: `Bearer ${token}`, 
    },
});

// Conditionally set the Authorization header
if (token) {
    instance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}

instance.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            console.error('Unauthorized, please log in again.');
        }
        return Promise.reject(error);
    }
);

export default instance;
