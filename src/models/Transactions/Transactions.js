import PaginationModel from "@/models/Pagination/Pagination";
import { getTypedArray, getString, getNumber } from "@/helpers/Model";

class Transaction {
    constructor(params) {
        params = params ?? {};

        this.transactionId = getNumber(params.transactionId);
        this.amount = getNumber(params.amount);
        this.status = getNumber(params.status);
        this.dateCreate = getString(params.dateCreate);
        this.dateClose = getString(params.dateClose);
        this.title = getString(params.title);
        this.cardId = getNumber(params.cardId);
        this.cardNumber = getString(params.cardNumber);
        this.phone = getString(params.phone);
        this.recipient = getString(params.recipient);
        this.fio = getString(params.fio);
        this.bankType = getNumber(params.bankType);
        this.cardLastNumber = getString(params.cardLastNumber);
        this.orderNumber = getNumber(params.orderNumber);
        this.cashbox = getNumber(params.cashbox);
        this.cardLastNumber = getString(params.cardLastNumber);
    }
};

export default class Transactions {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.transactions = getTypedArray(params.data, Transaction);
    }
};