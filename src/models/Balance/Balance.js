import { getNumber, getString } from "@/helpers/Model";

export default class Balance {
    constructor(params) {
        params = params ?? {};

        this.address = getString(params.address);
        this.balance = getNumber(params.balance);
        this.freeze = getNumber(params.freeze);
        this.rate = getNumber(params.rate);
        this.rateWithPercent = getNumber(params.rateWithPercent);
        this.ratePercent = getNumber(params.ratePercent);
    }
};