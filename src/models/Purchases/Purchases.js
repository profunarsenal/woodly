import PaginationModel from "@/models/Pagination/Pagination";
import { getTypedArray, getString, getNumber } from "@/helpers/Model";

class Purchase {
    constructor(params) {
        params = params ?? {};

        this.purchaseId = getNumber(params.purchaseId);
        this.cashbox = getNumber(params.cashbox);
        this.paymentSystem = getNumber(params.paymentSystem);
        this.bankType = getNumber(params.bankType);
        this.amount = getNumber(params.amount);
        this.orderNumber = getNumber(params.orderNumber);
        this.currency = getNumber(params.currency);
        this.requisites = getString(params.requisites);
        this.status = getNumber(params.status);
        this.dateCreate = getString(params.dateCreate);
        this.debit = getNumber(params.debit);
        this.receipt = getString(params.receipt);
    }
};

export default class Purchases {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.purchases = getTypedArray(params.data, Purchase);
    }
};