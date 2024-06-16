import ApiModule from '@/api/apiModule';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        cards: [],
        pagination: {},
        isWorkTransactions: false,
    },

    mutations: {
        setCards(state, cards) {
            state.cards = cards;
        },

        setPagination(state, pagination) {
            state.pagination = pagination;
        },

        setTransactionsStatus(state, status) {
            state.isWorkTransactions = status;
        },
    },

    actions: {
        async getCards({ commit }, params) {
            const { cards, pagination } = await api.cards.getCards(params);
            commit('setCards', cards);
            commit('setPagination', pagination);
        },

        async changeStatus(_, params) {
            try {
                await api.cards.changeCardStatus(params);
            } catch (error) {
                console.log(error)
            }
        },

        async getTransactionsStatus({ commit }) {
            const status = await api.auth.getTransactionsFlag();
            commit('setTransactionsStatus', status);
        },

        async toggleTransactionsStatus({ state, commit }) {
            try {
                await api.auth.switchTransactionsFlag();
                commit('setTransactionsStatus', !state.isWorkTransactions);
            } catch (error) {
                console.log(error)
            }
        },
    },
}