import { getString, getNumber } from "@/helpers/Model";

export default class User {
    constructor(params) {
        params = params ?? {};

        this.userId = getNumber(params.userId);
        this.name = getString(params.name);
        this.login = getString(params.login);
        this.email = getString(params.email);
        this.role = getString(params.role);
    }
};