import AbstractService from "@/api/abstractService";

export default class Withdrawals extends AbstractService {
    async createWithdrawal(payload) {
        return await this.axios.post('/withdrawals/create', payload);
    };

    async confirmWithdrawal(id) {
        return await this.axios.patch(`/withdrawals/confirm/${id}`);
    };
};