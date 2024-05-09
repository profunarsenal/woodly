import axios from 'axios';
import store from '@/store';
import router from '@/router';
import { BASE_URL } from '@/helpers/constants';

const request = axios.create({
    baseURL: BASE_URL,
});

if (localStorage.getItem('token')) {
    request.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
}

request.interceptors.response.use(null, error => {
    return new Promise(function (resolve, reject) {
        if (error.response.status === 401) {
            store.commit('auth/logout');
            router.push('/auth');
        }

        throw error;
    });
});

export default request;