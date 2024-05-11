import ApiModule from '@/api/apiModule';

const api = new ApiModule();

export default {
    namespaced: true,

    state: {
        purchases: [],
        pagination: {},
    },

    mutations: {
        setPurchases(state, purchases) {
            state.purchases = purchases;
        },

        setPagination(state, pagination) {
            state.pagination = pagination;
        },
    },

    actions: {

        async getPurchases({ commit }, params) {
            try {
                const { purchases, pagination} = await api.purchases.getPurchases(params);
                commit('setPurchases', purchases);
                commit('setPagination', pagination);
            } catch (error) {
                console.log(error);
            }
        },
    },
}