import axios from 'axios';
import { BASE_URL } from '@/helpers/constants';

const request = axios.create({
    baseURL: BASE_URL,
});

request.interceptors.response.use(null, error => {
    return Promise.reject(error);
});

export default request;