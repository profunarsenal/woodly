import AbstractService from "@/api/abstractService";

export default class Balance extends AbstractService {
    async getBalance() {
        const response = await this.axios.get('/balance');
        return response;
    };

    async getBalanceTransactions(params = {}) {
        const response = await this.axios.get('/balance/transactions', { params });
        return response;
    };
};