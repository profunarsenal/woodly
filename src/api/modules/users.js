import AbstractService from "@/api/abstractService";
import UsersModel from "@/models/Users/Users";

export default class Users extends AbstractService {
    async getUsers() {
        const { data } = await this.axios.get('/users');
        return new UsersModel(data);
    };
};