export const BASE_URL = 'https://woodly-azure.vercel.app';

export const ROLES = {
    admin: 'admin',
    trader: 'trader',
    merchant: 'merchant',
    operator: 'operator',
};

export const API = {
    main: '/',
    auth: '/auth',
    profile: {
        cards: '/profile/cards',
        sale: '/profile/sale',
        settings: '/profile/settings',
        balance: '/profile/balance',
        purchases: '/profile/purchases',
        cashRegister: '/profile/cash-register',
        payments: '/profile/payments',
        payouts: '/profile/payouts',
        autoPayments: '/profile/auto-payments',
        cardMessages: '/profile/card-messages',
        statistics: '/profile/statistics',
        users: '/profile/users',
    },
    payment: {
        base: '/payment',
        qrCode: '/payment/qr-code',
        crypto: '/payment/crypto',
        acquiring: '/payment/acquiring',
    },
    error404: '/error-404',
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
        path: API.profile.cashRegister,
        title: 'Кассы',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: API.profile.payments,
        title: 'Платежи',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: API.profile.payouts,
        title: 'Выплаты',
        id: 2,
    },
    {
        icon: '/icons/wallet.svg',
        path: API.profile.balance,
        title: 'Баланс',
        id: 3,
    },
    {
        icon: '/icons/settings.svg',
        path: API.profile.settings,
        title: 'Настройки',
        id: 4,
    },
];

export const TRADER_SIDEBAR_ITEMS = [
    {
        icon: '/icons/credit-card.svg',
        path: API.profile.cards,
        title: 'Мои карты',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: API.profile.sale,
        title: 'Продажа',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: API.profile.purchases,
        title: 'Покупка',
        id: 2,
    },
    {
        icon: '/icons/chart.svg',
        path: API.profile.statistics,
        title: 'Статистика',
        id: 3,
    },
    {
        icon: '/icons/wallet.svg',
        path: API.profile.balance,
        title: 'Баланс',
        id: 4,
    },
    {
        icon: '/icons/settings.svg',
        path: API.profile.settings,
        title: 'Настройки',
        id: 5,
    },
];

export const ADMIN_SIDEBAR_ITEMS = [
    {
        icon: '/icons/basket.svg',
        path: API.profile.cashRegister,
        title: 'Кассы',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: API.profile.payments,
        title: 'Платежи',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: API.profile.payouts,
        title: 'Выплаты',
        id: 2,
    },
    {
        icon: '/icons/user.svg',
        path: API.profile.users,
        title: 'Пользователи',
        id: 3,
    },
    {
        icon: '/icons/wallet.svg',
        path: API.profile.balance,
        title: 'Баланс',
        id: 4,
    },
    {
        icon: '/icons/chart.svg',
        path: API.profile.statistics,
        title: 'Статистика',
        id: 5,
    },
    {
        icon: '/icons/settings.svg',
        path: API.profile.settings,
        title: 'Настройки',
        id: 6,
    },
];

export const SIDEBAR_ITEMS = {
    [ROLES.admin]: ADMIN_SIDEBAR_ITEMS,
    [ROLES.trader]: TRADER_SIDEBAR_ITEMS,
    [ROLES.merchant]: MERCHANT_SIDEBAR_ITEMS,
    [ROLES.operator]: ADMIN_SIDEBAR_ITEMS,
};

export const CURRENCIES_SIGNS = {
    rub: '₽',
};