import ApiModule from '@/api/apiModule';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        balance: {},
        balanceTransactions: [],
        pagination: {
            limit: 1,
            total: 1,
            pages: 1,
        },
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
                const { data } = await api.balance.getBalance();
                commit('setBalance', data);
            } catch (error) {
                console.log(error);
            }
        },

        async getBalanceTransactions({ commit }, params) {
            try {
                const { data } = await api.balance.getBalanceTransactions(params);
                commit('setBalanceTransactions', data.transactions);
                commit('setPagination', {
                    limit: data.limit,
                    total: data.total,
                    pages: Math.ceil(data.total / data.limit),
                });
            } catch (error) {
                console.log(error);
            }
        },
    },
}