import Payment from "@/api/payment";

export default class ApiModule {
    constructor() {
        this.payment = new Payment();
    }
};