export const sliceStringAddDot = (str, maxLength) => {
    if (str?.length > maxLength) {
        return str.slice(0, maxLength) + '…';
    }

    return str ? str : '';
};