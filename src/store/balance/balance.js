import ApiModule from '@/api/apiModule';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        balances: [],
        balanceTransactions: [],
        pagination: {},
    },

    mutations: {
        setBalances(state, balances) {
            state.balances = balances;
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
                const balances = await api.balance.getBalance();
                commit('setBalances', balances);
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