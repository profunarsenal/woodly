import Auth from "@/api/modules/auth";
import Payment from "@/api/modules/payment";
import Cards from "@/api/modules/cards";
import Transactions from '@/api/modules/transactions';
import Balance from "@/api/modules/balance";
import Purchases from "@/api/modules/purchases";

export default class ApiModule {
    constructor() {
        this.auth = new Auth();
        this.payment = new Payment();
        this.cards = new Cards();
        this.transactions = new Transactions();
        this.balance = new Balance();
        this.purchases = new Purchases();
    }
};