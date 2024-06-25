import { isEmpty } from 'lodash';
import ApiModule from '@/api/apiModule';
import request from '@/helpers/http';
import { ROLES } from '@/helpers/constants';

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

        role(state) {
            return localStorage.getItem('role') || state.user?.role || '';
        },

        isAdmin(_, getters) {
            return getters.role === ROLES.admin;
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
            localStorage.setItem('role', user.role);
        },

        logout(state) {
            localStorage.removeItem('token');
            localStorage.removeItem('role');
            state.token = '';
            state.user = {};
        },
    },

    actions: {
        async login({ commit, dispatch }, form) {
            try {
                const { accessToken } = await api.auth.login(form);
                commit('setToken', accessToken);

                await dispatch('getUser');
            } catch (error) {
                console.log(error);
            }
        },

        async getUser({ commit }) {
            try {
                const user = await api.auth.getUser();
                commit('setUser', user);
            } catch (error) {
                console.log(error);
            }
        },
    },
}