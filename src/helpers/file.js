export const converBytesToSize = (bytes, precision = 2) => {
    if (bytes === 0) {
        return '0 Байт';
    }

    const units = ['Байт', 'КБ', 'МБ', 'ГБ', 'ТБ'];
    const index = Math.floor(Math.log(bytes) / Math.log(1024));

    return (bytes / Math.pow(1024, index)).toFixed(precision) + ' ' + units[index];
};

export const downloadFile = (file, filename) => {
    const blob = new Blob([file]);
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');

    link.href = url;
    link.download = filename;
    link.click();

    URL.revokeObjectURL(url);
};