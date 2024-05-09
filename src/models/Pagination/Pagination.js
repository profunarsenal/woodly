import { getNumber } from "@/helpers/Model";

export default class Pagination {
    constructor(params) {
        params = params ?? {};

        this.limit = getNumber(params.limit);
        this.total = getNumber(params.total);
        this.pages = Math.ceil(this.total / this.limit);
    }
};