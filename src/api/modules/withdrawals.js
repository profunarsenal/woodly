import AbstractService from "@/api/abstractService";
import WithdrawalsModel from "@/models/Withdrawals/Withdrawals";

export default class Withdrawals extends AbstractService {
    async getWithdrawals(params) {
        const { data } = await this.axios.get('/withdrawals', params);
        return new WithdrawalsModel(data);
    };

    async createWithdrawal(payload) {
        return await this.axios.post('/withdrawals/create', payload);
    };

    async confirmWithdrawal(id) {
        return await this.axios.patch(`/withdrawals/confirm/${id}`);
    };
};