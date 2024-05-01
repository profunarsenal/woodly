import AbstractService from "@/api/abstractService";

export default class Transactions extends AbstractService {
    async getTransactions(params = {}) {
        const response = await this.axios.get('/transactions', { params });
        return response;
    };

    async editTransaction(params = {}) {
        const response = await this.axios.patch('/transactions/edit', params);
        return response;
    };
};