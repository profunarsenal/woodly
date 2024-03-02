import AbstractService from "@/api/abstractService";

export default class Cards extends AbstractService {
    async getCards() {
        const response = await this.axios.get('/cards');
        return response;
    };

    async createCard(payload) {
        const response = await this.axios.post('/cards/create', payload);
        return response;
    };
};