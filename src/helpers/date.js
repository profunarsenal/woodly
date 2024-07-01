export const formatDate = (date) => {
    if (!date) {
        return null;
    }

    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    const formatNumber = (num) => num < 9 ? `0${num}` : num;

    return `${formatNumber(day)}/${formatNumber(month)}/${year}`;
};