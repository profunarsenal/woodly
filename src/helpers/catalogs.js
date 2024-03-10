export const BANK_TYPES = [
    { id: 1, title: 'Сбербанк' },
    { id: 2, title: 'Сбербанк' },
    { id: 3, title: 'СБП' },
];

export const TRANSACTIONS_STATUSES = {
    active: {
        key: 'active',
        icon: '/icons/activity.svg',
        title: 'Активные',
        transactionTitle: 'Активная',
        id: 1,
    },

    review: {
        key: 'review',
        icon: '/icons/spinner.svg',
        title: 'На проверке',
        transactionTitle: 'На проверке',
        color: 'yellow',
        id: 2,
    },

    canceled: {
        key: 'canceled',
        icon: '/icons/close.svg',
        title: 'Отмененные',
        transactionTitle: 'Отмененная',
        color: 'red',
        id: 3,
    },

    successful: {
        key: 'successful',
        icon: '/icons/checkbox-mark.svg',
        title: 'Успешные',
        transactionTitle: 'Успешная',
        color: 'green',
        id: 4,
    },
};