import axios from 'axios';

let token = localStorage.getItem('authToken');
const instance = axios.create({

    baseURL: 'http://localhost:8080/city-taxi/v1',

    // headers: {
    //     Authorization: `Bearer ${token}`, 
    // },
});

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
