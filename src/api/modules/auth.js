import AbstractService from "@/api/abstractService";

export default class Auth extends AbstractService {
    async login(form) {
        const response = await this.axios.post('/auth', form);
        return response;
    };

    async getUser() {
        const response = await this.axios.get('/auth/profile');
        return response;
    };
};