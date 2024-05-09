import { getNumber, getString } from "@/helpers/Model";

export default class Balance {
    constructor(params) {
        params = params ?? {};

        this.tokenId = getString(params.tokenId);
        this.balanceUsdt = getNumber(params.balanceUsdt);
        this.balanceRub = getNumber(params.balanceRub);
        this.balanceRubWithPercent = getNumber(params.balanceRubWithPercent);
        this.balanceRubFreeze = getNumber(params.balanceRubFreeze);
        this.balanceRubFreezeWithPercent = getNumber(params.balanceRubFreezeWithPercent);
        this.rate = getNumber(params.rate);
        this.rateWithPercent = getNumber(params.rateWithPercent);
    }
};