import { createStore } from 'vuex';
import modal from '@/store/modal/modal';
import payment from '@/store/payment/payment';
import cards from '@/store/cards/cards';
import transactions from '@/store/transactions/transactions';

export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        modal,
        payment,
        cards,
        transactions,
    },
});