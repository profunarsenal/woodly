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

class Cashbox {
    constructor(params) {
        params = params ?? {};

        this.cashboxId = getNumber(params.cashboxId);
        this.creatorId = getNumber(params.creatorId);
    }
}

class Transaction {
    constructor(params) {
        params = params ?? {};

        this.card = new Card(params.card);
        this.transactionId = getNumber(params.transactionId);
        this.amount = getNumber(params.amount);
        this.amountMinusCommission = getNumber(params.amountMinusCommission);
        this.status = getNumber(params.status);
        this.dateCreate = getString(params.dateCreate);
        this.dateClose = getString(params.dateClose);
        this.orderNumber = getNumber(params.orderNumber);
        this.cashbox = new Cashbox(params.cashbox);
        this.clientNumber = getString(params.clientNumber);
        this.paymentSystem = getNumber(params.paymentSystem);
    }
};

export default class Transactions {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.transactions = getTypedArray(params.data, Transaction);
    }
};