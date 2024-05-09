import ApiModule from '@/api/apiModule';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        balance: {},
        balanceTransactions: [],
        pagination: {},
    },

    mutations: {
        setBalance(state, balance) {
            state.balance = balance;
        },

        setBalanceTransactions(state, balanceTransactions) {
            state.balanceTransactions = balanceTransactions;
        },

        setPagination(state, pagination) {
            state.pagination = pagination;
        },
    },

    actions: {
        async getBalance({ commit }) {
            try {
                const balance = await api.balance.getBalance();
                commit('setBalance', balance);
            } catch (error) {
                console.log(error);
            }
        },

        async getBalanceTransactions({ commit }, params) {
            try {
                const { balanceTransactions, pagination } = await api.balance.getBalanceTransactions(params);
                commit('setBalanceTransactions', balanceTransactions);
                commit('setPagination', pagination);
            } catch (error) {
                console.log(error);
            }
        },
    },
}