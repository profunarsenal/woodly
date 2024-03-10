import AbstractService from "@/api/abstractService";

export default class Transactions extends AbstractService {
    async getTransactions(options = {}) {
        const params = {
            page: options.page,
            limit: options.limit,
            status: options.status,
        };
        const response = await this.axios.get('/transactions', { params });
        return response;
    };
};