import AbstractService from "@/api/abstractService";

export default class Transactions extends AbstractService {
    async getTransactions(options = {}) {
        const params = {
            page: options.page,
            limit: options.limit,
            status: options.status,
            cardNumberAndTitle: options.cardNumberAndTitle,
            transactionId: options.transactionId,
            amount: options.amount,
        };
        const response = await this.axios.get('/transactions', { params });
        return response;
    };

    async exportTransactions(dateStart, dateEnd) {
        const response = await this.axios.get(`/transactions/export?dateStart=${dateStart}&dateEnd=${dateEnd}`);
        return response;
    }
};