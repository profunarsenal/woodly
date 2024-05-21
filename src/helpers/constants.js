export const BASE_URL = 'https://woodly-azure.vercel.app';

export const ROLES = {
    admin: 'admin',
    trader: 'trader',
    merchant: 'merchant',
    operator: 'operator',
};

export const PAYMENT_STATUSES = {
    fail: 'fail',
    success: 'success',
    canceled: 'canceled',
    loading: 'loading',
};

export const MERCHANT_SIDEBAR_ITEMS = [
    {
        icon: '/icons/basket.svg',
        path: '/profile/cash-register',
        title: 'Кассы',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: '/profile/payments',
        title: 'Платежи',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: '/profile/payouts',
        title: 'Выплаты',
        id: 2,
    },
    {
        icon: '/icons/wallet.svg',
        path: '/profile/balance',
        title: 'Баланс',
        id: 3,
    },
    {
        icon: '/icons/settings.svg',
        path: '/profile/settings',
        title: 'Настройки',
        id: 4,
    },
];

export const TRADER_SIDEBAR_ITEMS = [
    {
        icon: '/icons/credit-card.svg',
        path: '/profile/cards',
        title: 'Мои карты',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: '/profile/sale',
        title: 'Продажа',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: '/profile/purchases',
        title: 'Покупка',
        id: 2,
    },
    {
        icon: '/icons/chart.svg',
        path: '/profile/statistics',
        title: 'Статистика',
        id: 3,
    },
    {
        icon: '/icons/wallet.svg',
        path: '/profile/balance',
        title: 'Баланс',
        id: 4,
    },
    {
        icon: '/icons/settings.svg',
        path: '/profile/settings',
        title: 'Настройки',
        id: 5,
    },
];

export const ADMIN_SIDEBAR_ITEMS = [
    {
        icon: '/icons/credit-card.svg',
        path: '/profile/cards',
        title: 'Мои карты',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: '/profile/sale',
        title: 'Продажа',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: '/profile/purchases',
        title: 'Покупка',
        id: 2,
    },
    {
        icon: '/icons/chart.svg',
        path: '/profile/statistics',
        title: 'Статистика',
        id: 3,
    },
    {
        icon: '/icons/wallet.svg',
        path: '/profile/balance',
        title: 'Баланс',
        id: 4,
    },
    {
        icon: '/icons/settings.svg',
        path: '/profile/settings',
        title: 'Настройки',
        id: 5,
    },
];

export const CURRENCIES_SIGNS = {
    rub: '₽',
};