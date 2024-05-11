import AbstractService from "@/api/abstractService";
import TransactionsModel from "@/models/Transactions/Transactions";

export default class Transactions extends AbstractService {
    async getTransactions(params = {}) {
        const { data } = await this.axios.get('/transactions', { params });
        return new TransactionsModel(data);
    };

    async editTransaction(params = {}) {
        return await this.axios.patch('/transactions/edit', params);
    };

    async confirmTransaction(id) {
        return await this.axios.patch(`/transactions/confirm/${id}`);
    };

    async cancelTransaction(id) {
        return await this.axios.patch(`/transactions/cancel/${id}`);
    };

    async exportTransactions(params) {
        return await this.axios.get('/transactions/export', {
            params,
            responseType: 'blob',
        });
    };
};