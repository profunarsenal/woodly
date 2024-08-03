import AbstractService from "@/api/abstractService";

export default class InternalTransfers extends AbstractService {
    async send(payload) {
        return await this.axios.post('/internal-transfers/send', payload);
    };
};