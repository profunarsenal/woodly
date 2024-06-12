import PaginationModel from "@/models/Pagination/Pagination";
import { getTypedArray, getString, getNumber } from "@/helpers/Model";

class Card {
    constructor(params) {
        params = params ?? {};

        this.title = getString(params.title);
        this.cardNumber = getString(params.cardNumber);
        this.fio = getString(params.fio);
        this.bankType = getNumber(params.bankType);
        this.phone = getString(params.phone);
        this.recipient = getString(params.recipient);
        this.cardId = getNumber(params.cardId);
        this.cardLastNumber = getString(params.cardLastNumber);
        this.userId = getNumber(params.userId);
    }
}

class Transaction {
    constructor(params) {
        params = params ?? {};

        this.card = new Card(params.card);
        this.transactionId = getNumber(params.transactionId);
        this.amount = getNumber(params.amount);
        this.status = getNumber(params.status);
        this.dateCreate = getString(params.dateCreate);
        this.dateClose = getString(params.dateClose);
        this.orderNumber = getNumber(params.orderNumber);
        this.cashbox = getNumber(params.cashbox);
    }
};

export default class Transactions {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.transactions = getTypedArray(params.data, Transaction);
    }
};