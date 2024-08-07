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
];

export const BALANCE_TRANSACTIONS = [
    { title: 'ID операции', key: 'transactionId', searchable: true },
    { title: 'Тип операции', key: 'status' },
    { title: 'ID платежа', key: 'paymentId', searchable: true },
    { title: 'Сумма', key: 'amount', filterable: true },
    { title: 'Дата и время', key: 'date', filterable: true },
];

export const PURCHASES = [
    { title: 'ID платежа', key: 'purchaseId', searchable: true },
    { title: 'Способ оплаты', key: 'paymentSystem' },
    { title: 'Карта', key: 'requisites', searchable: true },
    { title: 'Сумма', key: 'amount', searchable: true },
    { title: 'Статус', key: 'status' },
    { title: 'Создан', key: 'dateCreate' },
];

export const USERS = [
    { title: 'ID пользователя', key: 'userId' },
    { title: 'Название', key: 'name' },
    { title: 'Логин', key: 'login' },
    { title: 'Пароль', key: 'password' },
    { title: 'Уровень', key: 'role' },
];

export const CASHBOXES = [
    { title: 'ID кассы', key: 'cashboxId' },
    { title: 'Название', key: 'title' },
    { title: 'URL', key: 'url' },
    { title: 'Активен', key: 'status' },
    { title: 'Баланс', key: 'balance' },
    { title: 'API', key: 'apiKey' },
];

export const PAYOUTS = [
    { title: 'ID платежа', key: 'purchaseId' },
    { title: 'Заказ', key: 'orderNumber' },
    { title: 'Касса', key: 'cashbox' },
    { title: 'Списано', key: 'amount' },
    { title: 'Зачислено', key: 'amountWithTraderBonus' },
    { title: 'Способ выплаты', key: 'paymentSystem' },
    { title: 'Реквизит', key: 'requisites' },
    { title: 'Статус', key: 'status' },
    { title: 'Дата', key: 'dateCreate' },
];

export const PAYOUTS_INFO = [
    { title: 'Номер заказа', key: 'orderNumber' },
    { title: 'Реквизит', key: 'requisites' },
    { title: 'Дата создания', key: 'dateCreate' },
    { title: 'Дата выплаты', key: '' },
    { title: 'Сумма зачисления', key: '' },
];

export const PAYMENTS_TABLE_HEADERS = [
    { title: '№ сделки', key: 'transactionId' },
    { title: 'Заказа', key: 'orderNumber' },
    { title: 'Касса', key: 'cashbox' },
    { title: 'Сумма', key: 'amount' },
    { title: 'Зачислено', key: 'amountMinusCommission' },
    { title: 'ПС', key: 'paymentSystem' },
    { title: 'Статус', key: 'status' },
    { title: 'Дата', key: 'dateCreate' },
    { title: 'ID платежа', key: '' },
    { title: 'Клиент', key: 'clientNumber' },
];

export const ORDERED_PAYMENTS = [
    { title: 'ID пользователя', key: '' },
    { title: 'Адрес вывода', key: 'address' },
    { title: 'Сумма', key: 'amount' },
];