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

    async activateCard(cardId) {
        return await this.axios.patch(`/cards/activate/${cardId}`);
    };

    async disableCard(cardId) {
        return await this.axios.patch(`/cards/disable/${cardId}`);
    };

    async deleteCard(cardId) {
        return await this.axios.patch(`/cards/delete/${cardId}`);
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