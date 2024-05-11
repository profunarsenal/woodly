import AbstractService from "@/api/abstractService";
import BalanceModel from "@/models/Balance/Balance";
import BalanceTransactionsModel from "@/models/Balance/Transactions";

export default class Balance extends AbstractService {
    async getBalance() {
        const { data } = await this.axios.get('/balance');
        return new BalanceModel(data);
    };

    async getBalanceTransactions(params = {}) {
        const { data } = await this.axios.get('/balance/transactions', { params });
        return new BalanceTransactionsModel(data);
    };

    async exportBalance(params) {
        return await this.axios.get('/balance/export', {
            params,
            responseType: 'blob',
        });
    };
};