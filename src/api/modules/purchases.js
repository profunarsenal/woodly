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

    async changeStatus(purchaseId, status) {
        return await this.axios.patch('/purchases/change-status', {
            purchaseId,
            status,
        });
    };

    async uploadCheck(purchaseId, file) {
        return await this.axios.post('/purchases/upload',
            {
                purchaseId,
                file,
                comment: '',
            },
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            },
        );
    };
};