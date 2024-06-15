import ApiModule from '@/api/apiModule';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        users: [],
        pagination: {},
    },

    getters: {
    },

    mutations: {
        setUsers(state, users) {
            state.users = users;
        },

        setPagination(state, pagination) {
            state.pagination = pagination;
        },
    },

    actions: {
        async getUsers({ commit }) {
            try {
                const { users, pagination } = await api.users.getUsers();
                commit('setUsers', users);
                commit('setPagination', pagination);
            } catch (error) {
                console.log(error);
            }
        },

        async createUser({ dispatch }, user) {
            try {
                await api.users.createUser(user);
                await dispatch('getUsers');
            } catch (error) {
                throw error;
            }
        },

        async editUser({ dispatch }, user) {
            try {
                await api.users.editUser(user);
                await dispatch('getUsers');
            } catch (error) {
                throw error;
            }
        },

        async deleteUser({ dispatch }, userId) {
            try {
                await api.users.deleteUser(userId);
                await dispatch('getUsers');
            } catch (error) {
                console.log(error);
            }
        },
    },
}