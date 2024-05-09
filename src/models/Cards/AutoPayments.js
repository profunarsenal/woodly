import PaginationModel from "@/models/Pagination/Pagination";
import { getTypedArray, getString, getNumber } from "@/helpers/Model";

class AutoPayment {
    constructor(params) {
        params = params ?? {};

        this.autopaymentId = getNumber(params.autopaymentId);
        this.cardLastNumber = getString(params.cardLastNumber);
        this.amount = getNumber(params.amount);
        this.paymentTime = getString(params.paymentTime);
        this.message = getString(params.message);
    }
};

export default class AutoPayments {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.autopayments = getTypedArray(params.data, AutoPayment);
    }
};