import ApiModule from '@/api/apiModule';
import request from '@/helpers/http';
import { isEmpty } from 'lodash';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        token: localStorage.getItem('token') || '',
        user: {},
    },

    getters: {
        isAuth(state) {
            return !!state.token;
        },

        hasUser(state) {
            return !isEmpty(state.user);
        },
    },

    mutations: {
        setToken(state, token) {
            localStorage.setItem('token', token);
            request.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            state.token = token;
        },

        setUser(state, user) {
            state.user = user;
        },

        logout(state) {
            localStorage.removeItem('token');
            state.token = '';
            state.user = {};
        },
    },

    actions: {
        async login({ commit, dispatch }, form) {
            try {
                const { data } = await api.auth.login(form);
                commit('setToken', data.accessToken);

                await dispatch('getUser');
            } catch (error) {
                console.log(error);
            }
        },

        async getUser({ commit }) {
            try {
                const { data } = await api.auth.getUser();
                commit('setUser', data);
            } catch (error) {
                console.log(error);
            }
        },
    },
}