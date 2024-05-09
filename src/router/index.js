import { createRouter, createWebHistory } from 'vue-router';
import store from '@/store';
import HomeView from '@/views/HomeView.vue';

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
            component: () => import('@/views/Profile/ProfileCards.vue'),
            meta: {
                auth: true,
            },
        },
        {
            path: '/profile/sale',
            name: 'ProfileSale',
            component: () => import('@/views/Profile/ProfileSale.vue'),
            meta: {
                auth: true,
            },
        },
        {
            path: '/profile/settings',
            name: 'ProfileSettings',
            component: () => import('@/views/Profile/ProfileSettings.vue'),
            meta: {
                needHideFooter: true,
                auth: true,
            },
        },
        {
            path: '/profile/balance',
            name: 'ProfileBalance',
            component: () => import('@/views/Profile/ProfileBalance.vue'),
            meta: {
                needHideFooter: true,
                auth: true,
            },
        },
        {
            path: '/profile/purchases',
            name: 'ProfilePurchases',
            component: () => import('@/views/Profile/ProfilePurchases.vue'),
            meta: {
                needHideFooter: true,
                auth: true,
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
        },
        {
            path: '/card-messages/:id',
            name: 'CardMessages',
            component: () => import('@/views/Profile/CardMessages.vue'),
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
    const requireAuth = to.meta.auth;

    if (requireAuth && store.getters['auth/isAuth']) {
        next()
    } else if (requireAuth && !store.getters['auth/isAuth']) {
        next('/auth')
    } else {
        next()
    };
});

export default router;