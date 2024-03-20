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