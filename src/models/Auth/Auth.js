import { getString } from "@/helpers/Model";

export default class Auth {
    constructor(params) {
        params = params ?? {};

        this.accessToken = getString(params.accessToken);
    }
};