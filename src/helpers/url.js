import { BASE_URL } from '@/helpers/constants';

export const exportTransactions = async (dateStart, dateEnd) => {
    const url = `${BASE_URL}/transactions/export?dateStart=${dateStart}&dateEnd=${dateEnd}`;
    const link = document.createElement('a');

    link.href = url;
    link.click();
};