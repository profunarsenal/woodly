import ApiModule from '@/api/apiModule';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        transactions: [],
        pagination: {},
    },

    mutations: {
        setTransactions(state, transactions) {
            state.transactions = transactions;
        },

        setPagination(state, pagination) {
            state.pagination = pagination;
        },

        changeStatus(state, params) {
            const { transactionId, status} = params;

            state.transactions = state.transactions.map((item) => {
                if (item.transactionId === transactionId) {
                    item.status = status;
                }

                return item;
            });
        },
    },

    actions: {
        async getTransactions({ commit }, params) {
            try {
                const { transactions, pagination } = await api.transactions.getTransactions(params);
                commit('setTransactions', transactions);
                commit('setPagination', pagination);
            } catch (error) {
                console.log(error)
            }
        },

        async correctAmount({ state, commit }, params) {
            try {
                await api.transactions.editTransaction(params);
                
                const transactions = state.transactions.map((item) => {
                    if (item.transactionId === params.transactionId) {
                        item.amount = params.amount;
                    }

                    return item;
                });
                commit('setTransactions', transactions);
            } catch (error) {
                console.log(error)
            }
        },

        async confirmTransaction({ commit }, params) {
            try {
                await api.transactions.confirmTransaction(params.transactionId);
                commit('changeStatus', params);
            } catch (error) {
                console.log(error);
            }
        },

        async cancelTransaction({ commit }, params) {
            try {
                await api.transactions.cancelTransaction(params.transactionId);
                commit('changeStatus', params);
            } catch (error) {
                console.log(error);
            }
        },
    },
}