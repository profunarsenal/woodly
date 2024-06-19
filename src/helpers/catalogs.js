export const BANK_TYPES = [
    { id: 1, title: 'Сбербанк' },
    { id: 2, title: 'Сбербанк' },
    { id: 3, title: 'СБП' },
];

export const CARD_STATUSES = {
    active: 1,
    notActive: 2,
    deleted: 3,
};

export const TRANSACTIONS_STATUSES = {
    active: {
        key: 'active',
        icon: '/icons/activity.svg',
        title: 'Активные',
        transactionTitle: 'Активная',
        color: 'blue',
        id: 2,
    },

    review: {
        key: 'review',
        icon: '/icons/spinner.svg',
        title: 'На проверке',
        transactionTitle: 'На проверке',
        color: 'yellow',
        id: 3,
    },

    cancelled: {
        key: 'cancelled',
        icon: '/icons/close.svg',
        title: 'Отмененные',
        transactionTitle: 'Отмененная',
        color: 'red',
        id: 4,
    },

    successful: {
        key: 'successful',
        icon: '/icons/checkbox-mark.svg',
        title: 'Успешные',
        transactionTitle: 'Успешная',
        color: 'green',
        id: 5,
    },
};

export const BALANCE_STATUSES = {
    internal: {
        key: 'internal',
        id: 1,
        title: 'Внутренние',
        icon: '/icons/sort.svg',
        color: 'blue',
        transactionTitle: 'Внутренний',
    },

    replenishment: {
        key: 'replenishment',
        id: 2,
        title: 'Пополнения',
        icon: '/icons/arrow.svg',
        color: 'green',
        transactionTitle: 'Пополнение',
    },

    debit: {
        key: 'debit',
        id: 3,
        title: 'Списания',
        icon: '/icons/arrow.svg',
        color: 'red',
        transactionTitle: 'Списание',
    },

    freezing: {
        key: 'freezing',
        id: 4,
        title: 'Заморозка',
        icon: '/icons/time.svg',
        color: 'yellow',
        transactionTitle: 'Заморозка',
    },
};

export const PURCHASES_STATUSES = {
    available: {
        key: 'available',
        icon: '/icons/zipper.svg',
        title: 'Доступные',
        transactionTitle: 'Доступная ',
        color: 'yellow',
        id: 1,
    },
 
    active: {
        key: 'active',
        icon: '/icons/activity.svg',
        title: 'Активные',
        transactionTitle: 'Активная',
        color: 'blue',
        id: 2,
    },

    cancelled: {
        key: 'cancelled',
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

export const CASHBOXES_STATUSES = {
    active: {
        id: 1,
        class: 'active',
        icon: '/icons/checkmark-circle.svg',
    },
    disabled: {
        id: 2,
        class: 'disabled',
        icon: '/icons/close-circle.svg',
    },
};

export const PAYOUTS_STATUSES = {
    created: {
        key: 'created',
        icon: '/icons/activity.svg',
        title: 'Создана',
        color: 'blue',
        id: 1,
    },

    sent: {
        key: 'sent',
        icon: '/icons/checkbox-mark.svg',
        title: 'Отправлена',
        color: 'green',
        id: 2,
    },

    waiting: {
        key: 'waiting',
        icon: '/icons/spinner.svg',
        title: 'Ожидает',
        color: 'yellow',
        id: 3,
    },

    cancelled: {
        key: 'cancelled',
        icon: '/icons/close.svg',
        title: 'Отменена',
        color: 'red',
        id: 4,
    },
};