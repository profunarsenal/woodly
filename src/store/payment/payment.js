import { PAYMENT_STATUSES } from '@/helpers/constants.js';

export default {
    namespaced: true,

    state: {
        status: '',
    },

    getters: {
        isLoadingStatus(state) {
            return state.status === PAYMENT_STATUSES.loading;
        },

        isSuccessStatus(state) {
            return state.status === PAYMENT_STATUSES.success;
        },

        isFailStatus(state) {
            return state.status === PAYMENT_STATUSES.fail;
        },

        isCanceledStatus(state) {
            return state.status === PAYMENT_STATUSES.cancelled;
        },
    },

    mutations: {
        setStatus(state, payload) {
            state.status = payload;
        },
    },
}