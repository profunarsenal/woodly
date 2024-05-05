import axios from 'axios';
import { BASE_URL } from '@/helpers/constants';

const request = axios.create({
    baseURL: BASE_URL,
});

if (localStorage.getItem('token')) {
    request.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

request.interceptors.response.use(null, error => {
    return Promise.reject(error);
});

export default request;