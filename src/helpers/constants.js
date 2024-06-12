export const BASE_URL = 'https://woodly-azure.vercel.app';

export const ROLES = {
    admin: 'admin',
    trader: 'trader',
    merchant: 'merchant',
    operator: 'operator',
};

export const ROLES_RUSSIAN = {
    merchant: 'Мерчант',
    trader: 'Трейдер',
    operator: 'Оператор',
    admin: 'Администратор',
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
        сashboxes: '/profile/сashboxes',
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

export const MERCHANT_PAGES = [
    {
        icon: '/icons/basket.svg',
        path: API.profile.сashboxes,
        title: 'Кассы',
        permission: 'cashboxes',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: API.profile.payments,
        title: 'Платежи',
        permission: 'transactions',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: API.profile.payouts,
        title: 'Выплаты',
        permission: 'purchases',
        id: 2,
    },
    {
        icon: '/icons/wallet.svg',
        path: API.profile.balance,
        title: 'Баланс',
        permission: 'balance',
        id: 3,
    },
    {
        icon: '/icons/settings.svg',
        path: API.profile.settings,
        title: 'Настройки',
        permission: 'settings',
        id: 4,
    },
];

export const TRADER_PAGES = [
    {
        icon: '/icons/credit-card.svg',
        path: API.profile.cards,
        title: 'Мои карты',
        permission: 'cards',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: API.profile.sale,
        title: 'Продажа',
        permission: 'transactions',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: API.profile.purchases,
        title: 'Покупка',
        permission: 'purchases',
        id: 2,
    },
    {
        icon: '/icons/chart.svg',
        path: API.profile.statistics,
        title: 'Статистика',
        permission: 'statistics',
        id: 3,
    },
    {
        icon: '/icons/wallet.svg',
        path: API.profile.balance,
        title: 'Баланс',
        permission: 'balance',
        id: 4,
    },
    {
        icon: '/icons/settings.svg',
        path: API.profile.settings,
        title: 'Настройки',
        permission: 'settings',
        id: 5,
    },
];

export const ADMIN_PAGES = [
    {
        icon: '/icons/basket.svg',
        path: API.profile.сashboxes,
        title: 'Кассы',
        permission: 'cashboxes',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: API.profile.payments,
        title: 'Платежи',
        permission: 'transactions',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: API.profile.payouts,
        title: 'Выплаты',
        permission: 'purchases',
        id: 2,
    },
    {
        icon: '/icons/user.svg',
        path: API.profile.users,
        title: 'Пользователи',
        permission: 'users',
        id: 3,
    },
    {
        icon: '/icons/wallet.svg',
        path: API.profile.balance,
        title: 'Баланс',
        permission: 'balance',
        id: 4,
    },
    {
        icon: '/icons/chart.svg',
        path: API.profile.statistics,
        title: 'Статистика',
        permission: 'statistics',
        id: 5,
    },
    {
        icon: '/icons/settings.svg',
        path: API.profile.settings,
        title: 'Настройки',
        permission: 'settings',
        id: 6,
    },
];

export const USER_PAGES = {
    [ROLES.admin]: ADMIN_PAGES,
    [ROLES.trader]: TRADER_PAGES,
    [ROLES.merchant]: MERCHANT_PAGES,
    [ROLES.operator]: ADMIN_PAGES,
};

export const CURRENCIES_SIGNS = {
    rub: '₽',
};