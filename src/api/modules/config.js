import AbstractService from "@/api/abstractService";

export default class Config extends AbstractService {
    async getConfig(alias) {
        const response = await this.axios.get(`/configs/${alias}`);
        return response;
    };

    async editConfig(payload) {
        const response = await this.axios.patch('/configs/edit', payload);
        return response;
    };
};