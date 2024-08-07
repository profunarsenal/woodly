import AbstractService from "@/api/abstractService";
import AuthModel from '@/models/Auth/Auth';
import UserModel from "@/models/Auth/User";

export default class Auth extends AbstractService {
    async login(form) {
        const { data } = await this.axios.post('/auth', form);
        return new AuthModel(data);
    };

    async getUser() {
        const { data } = await this.axios.get('/auth/profile');
        return new UserModel(data);
    };

    async getTransactionsFlag() {
        const { data: status } = await this.axios.get('/auth/transactions-flag');
        return status;
    };

    async switchTransactionsFlag() {
        return await this.axios.patch('/auth/switch-transactions-flag');
    };
};