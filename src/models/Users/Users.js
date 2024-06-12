import PaginationModel from "@/models/Pagination/Pagination";
import { getTypedArray, getString, getNumber, getBoolean } from "@/helpers/Model";

class User {
    constructor(params) {
        params = params ?? {};

        this.userId = getNumber(params.userId);
        this.name = getString(params.name);
        this.password = getString(params.password);
        this.permissions = getTypedArray(params.permissions, String);
        this.role = getString(params.role);
        this.email = getString(params.email);
        this.login = getString(params.login);
        this.isWorkTransactions = getBoolean(params.isWorkTransactions);
    }
};

export default class Users {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.users = getTypedArray(params.data, User);
    }
};