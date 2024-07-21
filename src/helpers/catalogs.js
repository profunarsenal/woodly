export const BANK_TYPES = [
    { id: 1, title: 'Сбербанк' },
    { id: 2, title: 'СБП' },
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
    trader: [
        {
            key: 'internal',
            id: 1,
            title: 'Внутренние',
            icon: '/icons/sort.svg',
            color: 'blue',
            transactionTitle: 'Внутренний',
        },
        {
            key: 'deposit',
            id: 2,
            title: 'Пополнения',
            icon: '/icons/arrow.svg',
            color: 'green',
            transactionTitle: 'Пополнение',
        },
        {
            key: 'deduction',
            id: 3,
            title: 'Списания',
            icon: '/icons/arrow.svg',
            color: 'red',
            transactionTitle: 'Списание',
        },
        {
            key: 'freeze',
            id: 4,
            title: 'Заморозка',
            icon: '/icons/time.svg',
            color: 'yellow',
            transactionTitle: 'Заморозка',
        }
    ],
    merchant: [
        {
            key: 'transaction',
            id: 5,
            title: 'Платежи',
            icon: '/icons/arrow.svg',
            color: 'red',
            transactionTitle: 'Платёж',
        },
        {
            key: 'purchase',
            id: 6,
            title: 'Выплаты',
            icon: '/icons/arrow.svg',
            color: 'green',
            transactionTitle: 'Выплата',
        },
        {
            key: 'internal',
            id: 1,
            title: 'Внутренние',
            icon: '/icons/sort.svg',
            color: 'blue',
            transactionTitle: 'Внутренний',
        },
        {
            key: 'withdrawal',
            id: 7,
            title: 'Выводы',
            icon: '/icons/download.svg',
            color: 'yellow',
            transactionTitle: 'Вывод',
        },
    ],
    admin: [
        {
            key: 'ordered',
            id: 8,
            title: 'Заказанные выплаты',
            icon: '/icons/spinner.svg',
            color: 'yellow',
            transactionTitle: 'Заказанные выплата',
        },
        {
            key: 'internal',
            id: 1,
            title: 'Внутренние',
            icon: '/icons/sort.svg',
            color: 'blue',
            transactionTitle: 'Внутренний',
        },
        {
            key: 'transactionAdmin',
            id: 5,
            title: 'Платежи',
            icon: '/icons/arrow.svg',
            color: 'green',
            transactionTitle: 'Платёж',
        },
        {
            key: 'purchaseAdmin',
            id: 6,
            title: 'Выплаты',
            icon: '/icons/checkbox-mark.svg',
            color: 'green',
            transactionTitle: 'Выплата',
        },
        {
            key: 'sent',
            id: 9,
            title: 'Отправлено',
            icon: '/icons/arrow.svg',
            color: 'red',
            transactionTitle: 'Отправлено',
        },
        {
            key: 'depositTraders',
            id: 10,
            title: 'Пополнения трейдеров',
            icon: '/icons/arrow-circle.svg',
            color: 'green',
            transactionTitle: 'Пополнения трейдеров',
        },
    ],
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

export const PAYMENTS_STATUSES = {
    created: {
        key: 'created',
        icon: '/icons/activity.svg',
        title: 'Создан',
        color: 'blue',
        id: 1,
    },

    waiting: {
        key: 'waiting',
        icon: '/icons/time.svg',
        title: 'Ожидаем оплату',
        color: 'yellow',
        id: 2,
    },

    review: {
        key: 'review',
        icon: '/icons/spinner.svg',
        title: 'На проверке',
        color: 'blue',
        id: 3,
    },

    cancelled: {
        key: 'cancelled',
        icon: '/icons/close.svg',
        title: 'Отменен',
        color: 'red',
        id: 4,
    },

    completed: {
        key: 'completed',
        icon: '/icons/checkbox-mark.svg',
        title: 'Выполнен',
        color: 'green',
        id: 5,
    },
};