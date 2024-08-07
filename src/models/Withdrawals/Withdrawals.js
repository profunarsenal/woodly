import PaginationModel from "@/models/Pagination/Pagination";
import { getTypedArray, getString, getNumber } from "@/helpers/Model";

class Withdrawal {
    constructor(params) {
        params = params ?? {};

        this.amount = getNumber(params.amount);
        this.address = getString(params.address);
        this.withdrawalId = getNumber(params.withdrawalId);
    }
};

export default class Withdrawals {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.withdrawals = getTypedArray(params.data, Withdrawal);
    }
};