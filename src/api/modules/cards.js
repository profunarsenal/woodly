import AbstractService from "@/api/abstractService";
import CardsModel from "@/models/Cards/Cards";
import AutoPaymentsModel from "@/models/Cards/AutoPayments";
import MessagesModel from "@/models/Cards/Messages";

export default class Cards extends AbstractService {
    async getCards(params = {}) {
        const { data } = await this.axios.get('/cards', { params });
        return new CardsModel(data);
    };

    async createCard(form) {
        return await this.axios.post('/cards/create', form);
    };

    async editCard(form) {
        return await this.axios.patch('/cards/edit', form);
    };

    async changeCardStatus(payload) {
        return await this.axios.patch('/cards/change-status', payload);
    };

    async setLimit(payload) {
        return await this.axios.patch('/cards/set-limit', payload);
    };

    async getAutoPayments(params = {}) {
        const { data } = await this.axios.get('/autopayments', { params });
        return new AutoPaymentsModel(data);
    };

    async getCardMessages(params = {}) {
        const { data } = await this.axios.get('/messages', { params });
        return new MessagesModel(data);
    };
};