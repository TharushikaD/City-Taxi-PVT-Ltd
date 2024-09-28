import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://c5ed-2402-d000-a400-a11b-24a5-aadd-f4b4-dbf3.ngrok-free.app/',
    headers: {
        'Content-Type': 'application/json',
    },
});

// Remove the interceptor that adds the Authorization token
// instance.interceptors.request.use(
//     (config) => {
//         const token = localStorage.getItem('authToken');
//         if (token) {
//             config.headers['Authorization'] = `Bearer ${token}`;
//         }
//         return config;
//     },
//     (error) => {
//         return Promise.reject(error);
//     }
// );

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
