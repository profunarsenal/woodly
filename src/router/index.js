import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store/index';
import HomeView from '@/views/HomeView.vue';
import { ROLES, PAGES } from '@/helpers/constants';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: PAGES.main,
            name: 'HomeView',
            component: HomeView,
        },
        {
            path: PAGES.auth,
            name: 'Authorization',
            component: () => import('@/views/Authorization.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: PAGES.profile.cards,
            name: 'ProfileCards',
            component: () => import('@/views/Profile/Cards.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: PAGES.profile.sale,
            name: 'ProfileSale',
            component: () => import('@/views/Profile/Sale.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: PAGES.profile.settings,
            name: 'ProfileSettings',
            component: () => import('@/views/Profile/Settings.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader, ROLES.admin, ROLES.merchant, ROLES.operator],
            },
        },
        {
            path: PAGES.profile.balance,
            name: 'ProfileBalance',
            component: () => import('@/views/Profile/Balance.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader, ROLES.admin, ROLES.merchant, ROLES.operator],
            },
        },
        {
            path: PAGES.profile.purchases,
            name: 'ProfilePurchases',
            component: () => import('@/views/Profile/Purchases.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: PAGES.profile.cashboxes,
            name: 'ProfileCashboxes',
            component: () => import('@/views/Profile/Cashboxes.vue'),
            meta: {
                auth: true,
                roles: [ROLES.merchant, ROLES.admin, ROLES.operator],
            },
        },
        {
            path: PAGES.profile.payments,
            name: 'ProfilePayments',
            component: () => import('@/views/Profile/Payments.vue'),
            meta: {
                auth: true,
                roles: [ROLES.merchant, ROLES.admin, ROLES.operator],
            },
        },
        {
            path: PAGES.profile.payouts,
            name: 'ProfilePayouts',
            component: () => import('@/views/Profile/Payouts.vue'),
            meta: {
                auth: true,
                roles: [ROLES.merchant, ROLES.admin, ROLES.operator],
            },
        },
        {
            path: PAGES.profile.statistics,
            name: 'ProfileStatistics',
            component: () => import('@/views/Profile/Statistics.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader, ROLES.admin, ROLES.operator],
            },
        },
        {
            path: PAGES.profile.users,
            name: 'ProfileUsers',
            component: () => import('@/views/Profile/Users.vue'),
            meta: {
                auth: true,
                roles: [ROLES.admin, ROLES.operator],
            },
        },
        {
            path: `${PAGES.profile.autoPayments}/:id`,
            name: 'ProfileAutoPayments',
            component: () => import('@/views/Profile/AutoPayments.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: `${PAGES.profile.cardMessages}/:id`,
            name: 'ProfileCardMessages',
            component: () => import('@/views/Profile/CardMessages.vue'),
            meta: {
                auth: true,
                roles: [ROLES.trader],
            },
        },
        {
            path: PAGES.payment.base,
            name: 'PaymentView',
            component: () => import('@/views/PaymentViews/PaymentView.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: PAGES.payment.qrCode,
            name: 'PaymentQrCode',
            component: () => import('@/views/PaymentViews/PaymentQrCode.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: PAGES.payment.crypto,
            name: 'PaymentCrypto',
            component: () => import('@/views/PaymentViews/PaymentCrypto.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: PAGES.payment.acquiring,
            name: 'PaymentAcquiring',
            component: () => import('@/views/PaymentViews/PaymentAcquiring.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: PAGES.error404,
            name: 'Error',
            component: () => import('@/views/Error404.vue'),
            meta: {
                layout: 'empty',
            },
        },
        {
            path: '/:pathMatch(.*)*',
            redirect: PAGES.error404,
        },
    ],
});

router.beforeEach((to, from, next) => {
    const isAuthorizationRequired = to.meta.auth;
    const rolesWithAccess = to.meta.roles;
    const isUserAuthorized = store.getters['auth/isAuth'];
    const userRole = store.getters['auth/role'];

    if (isAuthorizationRequired && isUserAuthorized) {
        rolesWithAccess.includes(userRole) ? next() : next(PAGES.error404);
    } else if (isAuthorizationRequired && !isUserAuthorized) {
        next(PAGES.auth)
    } else {
        next()
    };
});

export default router;