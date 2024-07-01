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

        async deleteCard(_, cardId) {
            try {
                await api.cards.deleteCard(cardId);
            } catch (error) {
                console.log(error);
            }
        },

        async activateCard(_, cardId) {
            try {
                await api.cards.activateCard(cardId);
            } catch (error) {
                console.log(error);
            }
        },

        async disableCard(_, cardId) {
            try {
                await api.cards.disableCard(cardId);
            } catch (error) {
                console.log(error);
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
                console.log(error);
            }
        },
    },
}