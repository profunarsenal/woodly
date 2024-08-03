import Auth from "@/api/modules/auth";
import Payment from "@/api/modules/payment";
import Cards from "@/api/modules/cards";
import Transactions from '@/api/modules/transactions';
import Balance from "@/api/modules/balance";
import Purchases from "@/api/modules/purchases";
import Users from "@/api/modules/users";
import Cashboxes from "@/api/modules/cashboxes";
import InternalTransfers from "@/api/modules/internalTransfers";
import Withdrawals from "@/api/modules/withdrawals";

export default class ApiModule {
    constructor() {
        this.auth = new Auth();
        this.payment = new Payment();
        this.cards = new Cards();
        this.transactions = new Transactions();
        this.balance = new Balance();
        this.purchases = new Purchases();
        this.users = new Users();
        this.cashboxes = new Cashboxes();
        this.internalTransfers = new InternalTransfers();
        this.withdrawals = new Withdrawals();
    }
};