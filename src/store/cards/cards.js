import ApiModule from '@/api/apiModule';

const api = new ApiModule();
const CONFIG_ALIAS = 'IS_WORK_TRANSACTIONS';

export default {
    namespaced: true,

    state: {
        cards: [],
        isWorkTransactions: false,
        pagination: {
            limit: 1,
            total: 1,
            pages: 1,
        },
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
            const { data } = await api.cards.getCards(params);
            commit('setCards', data.cards);
            commit('setPagination', {
                limit: data.limit,
                total: data.total,
                pages: Math.ceil(data.total / data.limit),
            });
        },

        async changeStatus({ state, commit }, params) {
            try {
                await api.cards.changeCardStatus(params);

                const changedCards = state.cards.map((card) => {
                    if (card.cardId === params.cardId) {
                        card.status = params.status
                    }

                    return card;
                });

                commit('setCards', changedCards);
            } catch (error) {
                console.log(error)
            }
        },

        async getTransactionsStatus({ commit }) {
            const { data: status } = await api.config.getConfig(CONFIG_ALIAS);
            commit('setTransactionsStatus', status);
        },

        async toggleTransactionsStatus({ state, commit }) {
            try {
                await api.config.editConfig({
                    name: CONFIG_ALIAS,
                    value: String(!state.isWorkTransactions),
                });
                commit('setTransactionsStatus', !state.isWorkTransactions);
            } catch (error) {
                console.log(error)
            }
        },
    },
}