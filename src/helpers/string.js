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
    return `${newDate.getHours()}:${newDate.getMinutes()}`;
};