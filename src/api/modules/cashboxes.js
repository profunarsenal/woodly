import AbstractService from "@/api/abstractService";
import CashboxesModel from "@/models/Cashboxes/Cashboxes";

export default class Cashboxes extends AbstractService {
    async getCashboxes() {
        const { data } = await this.axios.get('/cashboxes');
        return new CashboxesModel(data);
    };

    async createCashbox(data) {
        return await this.axios.post('/cashboxes/create', data);
    };
};