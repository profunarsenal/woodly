import ApiModule from '@/api/apiModule';
import Withdrawals from '@/models/Withdrawals/Withdrawals';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        withdrawals: [],
        pagination: {},
    },

    getters: {
    },

    mutations: {
        setWithdrawals(state, withdrawals) {
            state.withdrawals = withdrawals;
        },

        setPagination(state, pagination) {
            state.pagination = pagination;
        },
    },

    actions: {
        async getWithdrawals({ commit }, params) {
            try {
                const { withdrawals, pagination } = await api.withdrawals.getWithdrawals(params);
                commit('setWithdrawals', withdrawals);
                commit('setPagination', pagination);
            } catch (error) {
                console.log(error);
            }
        },

        async changeWithdrawalStatus({ dispatch }, payload) {
            const { withdrawalId, type, params } = payload;
            const requests = {
                confirm: (id) => api.withdrawals.confirmWithdrawal(id),
                reject: () => ({}),
            };
            const request = requests[type];

            try {
                await request(withdrawalId);
                await dispatch('getWithdrawals', params);
            } catch (error) {
                console.log(error);
            }
        },
    },
}