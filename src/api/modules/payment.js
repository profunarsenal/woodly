import AbstractService from "@/api/abstractService";

export default class Payment extends AbstractService {
    async createTransactions() {
        const response = await this.axios.post('/transactions/create', {
            methodId: 'sber',
            amount: 270,
        });
        return response;
    }
};