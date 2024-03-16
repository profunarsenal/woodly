import { createRouter, createWebHistory } from 'vue-router';
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
        },
        {
            path: '/profile/sale',
            name: 'ProfileSale',
            component: () => import('@/views/Profile/ProfileSale.vue'),
        },
        {
            path: '/profile/settings',
            name: 'ProfileSettings',
            component: () => import('@/views/Profile/ProfileSettings.vue'),
            meta: {
                needHideFooter: true,
            },
        },
        {
            path: '/auto-payments/:id',
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

export default router;
