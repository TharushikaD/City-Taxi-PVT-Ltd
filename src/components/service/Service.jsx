import axios from 'axios';

let token = localStorage.getItem('authToken');
const instance = axios.create({

    baseURL: 'https://003a-2402-d000-a400-e70-1c59-450b-5152-6a75.ngrok-free.app/city-taxi/v1',

    // headers: {
    //     Authorization: `Bearer ${token}`, 
    // },
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
