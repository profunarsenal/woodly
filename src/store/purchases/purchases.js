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

        async confirmPurchase({ commit }, params) {
            try {
                await api.purchases.confirmPurchase(params.purchaseId);
                commit('setChangedPurchases', params);
            } catch (error) {
                console.log(error);
            }
        },

        async acceptPurchase({ commit }, params) {
            try {
                await api.purchases.acceptPurchase(params.purchaseId);
                commit('setChangedPurchases', params);
            } catch (error) {
                console.log(error);
            }
        },

        async cancelPurchase({ commit }, params) {
            try {
                await api.purchases.cancelPurchase(params.purchaseId);
                commit('setChangedPurchases', params);
            } catch (error) {
                console.log(error);
            }
        },
    },
}