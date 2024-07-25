import ApiModule from '@/api/apiModule';
import { CARD_STATUSES } from '@/helpers/catalogs';

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

        async changeStatus({ dispatch }, params) {
            const { cardId, status, urlParams } = params;
            const requests = {
                [CARD_STATUSES.active]: (cardId) => api.cards.activateCard(cardId),
                [CARD_STATUSES.notActive]: (cardId) => api.cards.disableCard(cardId),
                [CARD_STATUSES.deleted]: (cardId) => api.cards.deleteCard(cardId),
            };
            const request = requests[status];

            await request(cardId);
            await dispatch('getCards', urlParams);
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