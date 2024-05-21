import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import HomeView from '@/views/HomeView.vue';
import { ROLES } from '@/helpers/constants';

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'HomeView',
            component: HomeView,
        },
        {
            path: '/profile/cards',
            name: 'ProfileCards',
            component: () => import('@/views/Profile/Cards.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: '/profile/sale',
            name: 'ProfileSale',
            component: () => import('@/views/Profile/Sale.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: '/profile/settings',
            name: 'ProfileSettings',
            component: () => import('@/views/Profile/Settings.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: '/profile/balance',
            name: 'ProfileBalance',
            component: () => import('@/views/Profile/Balance.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: '/profile/purchases',
            name: 'ProfilePurchases',
            component: () => import('@/views/Profile/Purchases.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: '/profile/cash-register',
            name: 'ProfileCashRegister',
            component: () => import('@/views/Profile/CashRegister.vue'),
            meta: {
                auth: true,
                roles: [ROLES.merchant],
            },
        },
        {
            path: '/profile/payments',
            name: 'ProfilePayments',
            component: () => import('@/views/Profile/Payments.vue'),
            meta: {
                auth: true,
                roles: [ROLES.merchant],
            },
        },
        {
            path: '/profile/payouts',
            name: 'ProfilePayouts',
            component: () => import('@/views/Profile/Payouts.vue'),
            meta: {
                auth: true,
                roles: [ROLES.merchant],
            },
        },
        {
            path: '/auth',
            name: 'Authorization',
            component: () => import('@/views/Authorization.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: '/cards/auto-payments/:id',
            name: 'AutoPayments',
            component: () => import('@/views/Profile/AutoPayments.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: '/card-messages/:id',
            name: 'CardMessages',
            component: () => import('@/views/Profile/CardMessages.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: '/payment',
            name: 'PaymentView',
            component: () => import('@/views/PaymentViews/PaymentView.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: '/payment-qr-code',
            name: 'PaymentQrCode',
            component: () => import('@/views/PaymentViews/PaymentQrCode.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: '/payment-crypto',
            name: 'PaymentCrypto',
            component: () => import('@/views/PaymentViews/PaymentCrypto.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: '/payment-acquiring',
            name: 'PaymentAcquiring',
            component: () => import('@/views/PaymentViews/PaymentAcquiring.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'Error',
            component: () => import('@/views/Error404.vue'),
            meta: {
                layout: 'empty',
            },
        },
    ],
});

router.beforeEach((to, from, next) => {
    const isAuth = store.getters['auth/isAuth'];
    const requireAuth = to.meta.auth;

    if (requireAuth && isAuth) {
        next()
    } else if (requireAuth && !isAuth) {
        next('/auth')
    } else {
        next()
    };
});

export default router;