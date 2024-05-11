import AbstractService from "@/api/abstractService";
import PurchasesModel from "@/models/Purchases/Purchases";

export default class Purchases extends AbstractService {
    async getPurchases(params = {}) {
        const { data } = await this.axios.get('/purchases', { params });
        return new PurchasesModel(data);
    };

    async exportPurchases(params) {
        return await this.axios.get('/purchases/export', {
            params,
            responseType: 'blob',
        });
    };
};