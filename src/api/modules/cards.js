import AbstractService from "@/api/abstractService";

export default class Cards extends AbstractService {
    async getCards(options = {}) {
        const params = {
            page: options.page,
            limit: options.limit,
            status: options.status,
            cardNumber: options.cardNumber,
        };
        const response = await this.axios.get('/cards', { params });
        return response;
    };

    async createCard(form) {
        const response = await this.axios.post('/cards/create', form);
        return response;
    };

    async editCard(form) {
        const response = await this.axios.patch('/cards/edit', form);
        return response;
    };

    async changeCardStatus(payload) {
        const response = await this.axios.patch('/cards/change-status', payload);
        return response;
    };

    async setLimit(payload) {
        const response = await this.axios.patch('/cards/set-limit', payload);
        return response;
    };

    async getAutoPayments(cardId) {
        const response = await this.axios.get(`/cards/${cardId}/transactions`);
        return response;
    }
};