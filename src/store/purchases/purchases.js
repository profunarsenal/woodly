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

        setChangedPurchases(state, params) {
            state.purchases = state.purchases.map((item) => {
                if (item.purchaseId === params.purchaseId) {
                    item.status = params.status;
                }

                return item;
            });
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

        async changeStatus({ commit }, params) {
            try {
                const { purchaseId, status } = params;
                await api.purchases.changeStatus(purchaseId, status);
                commit('setChangedPurchases', params);
            } catch (error) {
                console.log(error);
            }
        },
    },
}