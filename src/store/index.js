import { createStore } from 'vuex';
import auth from '@/store/auth/auth';
import modal from '@/store/modal/modal';
import payment from '@/store/payment/payment';
import cards from '@/store/cards/cards';
import transactions from '@/store/transactions/transactions';
import balance from '@/store/balance/balance';

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
        auth,
        modal,
        payment,
        cards,
        transactions,
        balance,
    },
});