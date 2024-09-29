import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://4c85-111-223-185-63.ngrok-free.app/city-taxi/v1',
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
