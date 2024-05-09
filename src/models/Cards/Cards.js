import PaginationModel from "@/models/Pagination/Pagination";
import { getTypedArray, getString, getNumber, getBoolean } from "@/helpers/Model";

class Card {
    constructor(params) {
        params = params ?? {};

        this.apiKey = getString(params.apiKey);
        this.cardId = getNumber(params.cardId);
        this.title = getString(params.title);
        this.cardNumber = getString(params.cardNumber);
        this.fio = getString(params.fio);
        this.bankType = getNumber(params.bankType);
        this.processMethod = getNumber(params.processMethod);
        this.currency = getNumber(params.currency);
        this.deviceId = getString(params.deviceId);
        this.slotSim = getNumber(params.slotSim);
        this.isQiwi = getBoolean(params.isQiwi);
        this.isSbp = getBoolean(params.isSbp);
        this.phone = getString(params.phone);
        this.recipient = getString(params.recipient);
        this.turnoverPaymentsPerDay = getNumber(params.turnoverPaymentsPerDay);
        this.turnoverTransactionsPerDay = getNumber(params.turnoverTransactionsPerDay);
        this.paymentsLimitPerDay = getNumber(params.paymentsLimitPerDay);
        this.transactionsLimitPerDay = getNumber(params.transactionsLimitPerDay);
        this.paymentMin = getNumber(params.paymentMin);
        this.paymentMax = getNumber(params.paymentMax);
        this.status = getNumber(params.status);
        this.cardLastNumber = getString(params.cardLastNumber);
    }
};

export default class Cards {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.cards = getTypedArray(params.data, Card);
    }
};