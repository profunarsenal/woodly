import { createStore } from 'vuex';
import auth from '@/store/auth/auth';
import modal from '@/store/modal/modal';
import payment from '@/store/payment/payment';
import cards from '@/store/cards/cards';
import transactions from '@/store/transactions/transactions';
import balance from '@/store/balance/balance';
import purchases from '@/store/purchases/purchases';
import users from '@/store/users/users';
import cashboxes from '@/store/cashboxes/cashboxes';
import withdrawals from '@/store/withdrawals/withdrawals';

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
        purchases,
        users,
        cashboxes,
        withdrawals,
    },
});