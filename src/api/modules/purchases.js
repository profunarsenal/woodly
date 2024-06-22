import AbstractService from "@/api/abstractService";
import PurchasesModel from "@/models/Purchases/Purchases";

export default class Purchases extends AbstractService {
    async getPurchases(params = {}) {
        const { data } = await this.axios.get('/purchases', { params });
        return new PurchasesModel(data);
    };

    async createPurchase(params) {
        return await this.axios.post('/purchases/create', params);
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

    async acceptPurchase(id) {
        return await this.axios.patch(`/purchases/activate/${id}`);
    };

    async confirmPurchase(id) {
        return await this.axios.patch(`/purchases/confirm/${id}`);
    };

    async cancelPurchase(id) {
        return await this.axios.patch(`/purchases/cancel/${id}`);
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