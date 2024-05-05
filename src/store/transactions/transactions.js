import ApiModule from '@/api/apiModule';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        transactions: [],
        pagination: {
            limit: 1,
            total: 1,
            pages: 1,
        },
    },

    mutations: {
        setTransactions(state, transactions) {
            state.transactions = transactions;
        },

        setPagination(state, pagination) {
            state.pagination = pagination;
        },
    },

    actions: {
        async getTransactions({ commit }, params) {
            try {
                const { data } = await api.transactions.getTransactions(params);
                commit('setTransactions', data.transactions);
                commit('setPagination', {
                    limit: data.limit,
                    total: data.total,
                    pages: Math.ceil(data.total / data.limit),
                });
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

        async changeTransactionStatus({ state, commit }, params) {
            try {
                await api.transactions.editTransaction(params);

                const transactions = state.transactions.map((item) => {
                    if (item.transactionId === params.transactionId) {
                        item.status = params.status;
                    }

                    return item;
                });
                commit('setTransactions', transactions);
            } catch (error) {
                console.log(error)
            }
        },
    },
}