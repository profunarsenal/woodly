import Payment from "@/api/modules/payment";
import Cards from "@/api/modules/cards";

export default class ApiModule {
    constructor() {
        this.payment = new Payment();
        this.cards = new Cards();
    }
};