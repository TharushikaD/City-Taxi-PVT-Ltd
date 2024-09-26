// import axios from "axios";


// const instance = axios.create({
//     baseURL: 'http://localhost:8080/v1/users', 
// });


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


import axios from 'axios';

const instance = axios.create({
    baseURL: 'http://localhost:8080/v1/users',
    headers: {
        'Content-Type': 'application/json',  
    },
    withCredentials: true  
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

