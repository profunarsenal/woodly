import AbstractService from "@/api/abstractService";
import UsersModel from "@/models/Users/Users";

export default class Users extends AbstractService {
    async getUsers() {
        const { data } = await this.axios.get('/users');
        return new UsersModel(data);
    };

    async createUser(user) {
        return await this.axios.post('/users/create', user);
    };

    async editUser(user) {
        return await this.axios.patch('/users/edit', user);
    };

    async deleteUser(userId) {
        return await this.axios.delete(`/users/delete/${userId}`);
    };
};