import ApiModule from '@/api/apiModule';
import { PURCHASES_STATUSES } from '@/helpers/catalogs';

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

        async changePurchaseStatus({ commit }, params) {
            const { purchaseId, status } = params;
            const requests = {
                [PURCHASES_STATUSES.active.id]: (purchaseId) => api.purchases.acceptPurchase(purchaseId),
                [PURCHASES_STATUSES.successful.id]: (purchaseId) => api.purchases.confirmPurchase(purchaseId),
                [PURCHASES_STATUSES.cancelled.id]: (purchaseId) => api.purchases.cancelPurchase(purchaseId),
            };
            const request = requests[status];

            try {
                await request(purchaseId);
                await commit('setChangedPurchases', params);
            } catch (error) {
                console.log(error);
            }
        },
    },
}