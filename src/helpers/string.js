import { CURRENCIES_SIGNS } from '@/helpers/constants';

export const sliceStringAddDot = (str, maxLength) => {
    if (str?.length > maxLength) {
        return str.slice(0, maxLength) + '…';
    }

    return str ? str : '';
};

export const formatDate = (date) => {
    const d = new Date(date);
    const year = d.getFullYear();

    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();

    if (month.length < 2) {
        month = '0' + month;
    }

    if (day.length < 2) {
        day = '0' + day;
    }

    return [day, month, year].join('.');
};

export const formatTime = (date) => {
    const newDate = new Date(date);
    let hours = String(newDate.getHours());
    let minutes = String(newDate.getMinutes());

    if (hours.length < 2) {
        hours = '0' + hours;
    }

    if (minutes.length < 2) {
        minutes = '0' + minutes;
    }

    return `${hours}:${minutes}`;
};

export const getCurrencyValue = (value, currency = CURRENCIES_SIGNS.rub) => {
    return `${value}${currency}`;
};

export const formatCardNumber = (cardNumber) => {
    return cardNumber.match(/.{1,4}/g).join(' ');
}