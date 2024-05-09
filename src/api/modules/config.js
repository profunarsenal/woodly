import AbstractService from "@/api/abstractService";

export default class Config extends AbstractService {
    async getConfig(alias) {
        const { data: status } = await this.axios.get(`/configs/${alias}`);
        return status;
    };

    async editConfig(payload) {
        return await this.axios.patch('/configs/edit', payload);
    };
};