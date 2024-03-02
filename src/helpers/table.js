export const CARDS_TABLE_HEADERS = [
    { title: 'ID карты', key: 'cardId' },
    { title: 'Название', key: 'title' },
    { title: 'Номер карты', key: 'cardNumber', searchable: true },
    { title: 'Банк', key: 'bankType' },
    { title: 'Оборот', key: 'turnover', subtitle: 'сегодня' },
    { title: 'Лимит', key: 'transactionsLimitPerDay', subtitle: 'сегодня' },
    { title: 'Лимит', key: 'transactionsLimit', subtitle: 'на платеж' },
    { title: 'Статус', key: 'status' },
];