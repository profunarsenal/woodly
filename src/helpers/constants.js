export const BASE_URL = 'https://woodly-azure.vercel.app';

export const SUPPORT_EMAIL = 'support@woodly.ru';

export const TELEGRAM_BOT = 'WoodlyNotifyBot';

export const WOODLY_COPY = '© 2024 Woodly, Inc';

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

export const PAGES = {
    main: '/',
    auth: '/auth',
    profile: {
        cards: '/profile/cards',
        sale: '/profile/sale',
        settings: '/profile/settings',
        balance: '/profile/balance',
        purchases: '/profile/purchases',
        cashboxes: '/profile/cashboxes',
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
    cancelled: 'cancelled',
    loading: 'loading',
};

export const PAYMENT_SYSTEMS = {
    card: {
        title: 'Банковская карта',
        id: 1,
    },
    sbp: {
        title: 'СБП',
        id: 2,
    },
};

export const MERCHANT_PAGES = [
    {
        icon: '/icons/basket.svg',
        path: PAGES.profile.cashboxes,
        title: 'Кассы',
        permission: 'cashboxes',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: PAGES.profile.payments,
        title: 'Платежи',
        permission: 'transactions',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: PAGES.profile.payouts,
        title: 'Выплаты',
        permission: 'purchases',
        id: 2,
    },
    {
        icon: '/icons/wallet.svg',
        path: PAGES.profile.balance,
        title: 'Баланс',
        permission: 'balance',
        id: 3,
    },
    {
        icon: '/icons/settings.svg',
        path: PAGES.profile.settings,
        title: 'Настройки',
        permission: 'settings',
        id: 4,
    },
];

export const TRADER_PAGES = [
    {
        icon: '/icons/credit-card.svg',
        path: PAGES.profile.cards,
        title: 'Мои карты',
        permission: 'cards',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: PAGES.profile.sale,
        title: 'Продажа',
        permission: 'transactions',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: PAGES.profile.purchases,
        title: 'Покупка',
        permission: 'purchases',
        id: 2,
    },
    {
        icon: '/icons/chart.svg',
        path: PAGES.profile.statistics,
        title: 'Статистика',
        permission: 'statistics',
        id: 3,
    },
    {
        icon: '/icons/wallet.svg',
        path: PAGES.profile.balance,
        title: 'Баланс',
        permission: 'balance',
        id: 4,
    },
    {
        icon: '/icons/settings.svg',
        path: PAGES.profile.settings,
        title: 'Настройки',
        permission: 'settings',
        id: 5,
    },
];

export const ADMIN_PAGES = [
    {
        icon: '/icons/basket.svg',
        path: PAGES.profile.cashboxes,
        title: 'Кассы',
        permission: 'cashboxes',
        id: 0,
    },
    {
        icon: '/icons/credit-card-payout.svg',
        path: PAGES.profile.payments,
        title: 'Платежи',
        permission: 'transactions',
        id: 1,
    },
    {
        icon: '/icons/credit-card-payment.svg',
        path: PAGES.profile.payouts,
        title: 'Выплаты',
        permission: 'purchases',
        id: 2,
    },
    {
        icon: '/icons/user.svg',
        path: PAGES.profile.users,
        title: 'Пользователи',
        permission: 'users',
        id: 3,
    },
    {
        icon: '/icons/wallet.svg',
        path: PAGES.profile.balance,
        title: 'Баланс',
        permission: 'balance',
        id: 4,
    },
    {
        icon: '/icons/chart.svg',
        path: PAGES.profile.statistics,
        title: 'Статистика',
        permission: 'statistics',
        id: 5,
    },
    {
        icon: '/icons/settings.svg',
        path: PAGES.profile.settings,
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