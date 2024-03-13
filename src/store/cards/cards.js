import ApiModule from '@/api/apiModule';
const axios = new ApiModule();

export default {
    namespaced: true,

    state: {
        cards: [],
        pagination: {
            page: 1,
            count: 1,
            total: 1,
        },
    },

    mutations: {
        setCards(state, cards) {
            state.cards = cards;
        },
        setPagination(state, pagination) {
            state.pagination = pagination;
        },
    },

    actions: {
        async getCards({ commit }, params) {
            const { data } = await axios.cards.getCards(params);
            commit('setCards', data.cards);
            commit('setPagination', {
                page: data.page,
                count: data.count,
                total: data.total,
            });
        },
    },
}