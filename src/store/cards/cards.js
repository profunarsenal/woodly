import ApiModule from '@/api/apiModule';
const axios = new ApiModule();

export default {
    namespaced: true,

    state: {
        cards: [],
    },

    mutations: {
        setCards(state, cards) {
            state.cards = cards;
        },
    },

    actions: {
        async getCards({ commit }, params) {
            const { data } = await axios.cards.getCards(params);
            commit('setCards', data.cards);
        },
    },
}