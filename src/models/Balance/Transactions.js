import PaginationModel from "@/models/Pagination/Pagination";
import { getTypedArray, getString, getNumber } from "@/helpers/Model";

class BalanceTransaction {
    constructor(params) {
        params = params ?? {};

        this.transactionId = getString(params.transactionId);
        this.status = getNumber(params.status);
        this.amount = getNumber(params.amount);
        this.date = getString(params.date);
    }
};

export default class BalanceTransactions {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.balanceTransactions = getTypedArray(params.data, BalanceTransaction);
    }
};