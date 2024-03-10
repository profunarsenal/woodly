import Payment from "@/api/modules/payment";
import Cards from "@/api/modules/cards";
import Transactions from '@/api/modules/transactions';

export default class ApiModule {
    constructor() {
        this.payment = new Payment();
        this.cards = new Cards();
        this.transactions = new Transactions();
    }
};