import ApiModule from '@/api/apiModule';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        cashboxes: [],
        pagination: {},
    },

    getters: {
    },

    mutations: {
        setCashboxes(state, cashboxes) {
            state.cashboxes = cashboxes;
        },

        setPagination(state, pagination) {
            state.pagination = pagination;
        },
    },

    actions: {
        async getCashboxes({ commit }) {
            try {
                const { cashboxes, pagination } = await api.cashboxes.getCashboxes();
                commit('setCashboxes', cashboxes);
                commit('setPagination', pagination);
            } catch (error) {
                console.log(error);
            }
        },

        async createCashbox({ dispatch }, data) {
            try {
                await api.cashboxes.createCashbox(data);
                await dispatch('getCashboxes');
            } catch (error) {
                throw error;
            }
        },
    },
}