import PaginationModel from "@/models/Pagination/Pagination";
import { getTypedArray, getString, getNumber } from "@/helpers/Model";

class Balance {
    constructor(params) {
        params = params ?? {};

        this.RUB = params.rub || 0;
    }
}

class Cashbox {
    constructor(params) {
        params = params ?? {};

        this.cashboxId = getNumber(params.cashboxId);
        this.title = getString(params.title);
        this.url = getString(params.url);
        this.successUrl = getString(params.successUrl);
        this.errorUrl = getString(params.errorUrl);
        this.notificationUrlPayments = getString(params.notificationUrlPayments);
        this.notificationUrlPayOff = getString(params.notificationUrlPayOff);
        this.commissionPayer = getString(params.commissionPayer);
        this.apiKey = getString(params.apiKey);
        this.creatorId = getNumber(params.creatorId);
        this.status = getNumber(params.status);
        this.balance = new Balance(params.balance);
    }
};

export default class Cashboxes {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.cashboxes = getTypedArray(params.data, Cashbox);
    }
};