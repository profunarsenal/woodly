export const CARDS_TABLE_HEADERS = [
    { title: 'ID карты', key: 'cardId' },
    { title: 'Название', key: 'title' },
    { title: 'Номер карты', key: 'cardNumber', searchable: true },
    { title: 'Банк', key: 'bankType' },
    { title: 'Оборот', key: 'turnover', subtitle: 'сегодня' },
    { title: 'Лимит', key: 'limitToday', subtitle: 'сегодня' },
    { title: 'Лимит', key: 'transactionsLimit', subtitle: 'на платеж' },
    { title: 'Статус', key: 'status' },
];

export const TRANSACTIONS_TABLE_HEADERS = [
    { title: 'ID сделки', key: 'transactionId', searchable: true },
    { title: 'Название и номер карты', key: 'cardNumberAndTitle', searchable: true },
    { title: 'Сумма', key: 'amount', searchable: true },
    { title: 'Статус', key: 'status' },
    { title: 'Создан', key: 'dateCreate' },
    { title: 'Закрытие', key: 'dateClose' },
];

export const AUTOPAYMENTS = [
    { title: 'ID платежа', key: 'autopaymentId' },
    { title: 'Платеж', key: 'payment' },
    { title: 'Карта', key: 'cardLastNumber' },
    { title: 'Сумма', key: 'amount' },
    { title: 'Дата и время', key: 'paymentTime' },
    { title: 'Описание', key: 'message' },
];

export const CARD_MESSAGES = [
    { title: 'ID СМС', key: 'messageId' },
    { title: 'Отправитель', key: 'sender' },
    { title: 'Описание', key: 'message' },
    { title: 'Дата и время', key: 'dateCreate' },
]