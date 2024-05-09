import PaginationModel from "@/models/Pagination/Pagination";
import { getTypedArray, getString, getNumber } from "@/helpers/Model";

class Message {
    constructor(params) {
        params = params ?? {};

        this.messageId = getNumber(params.messageId);
        this.cardLastNumber = getString(params.cardLastNumber);
        this.dateCreate = getString(params.dateCreate);
        this.message = getString(params.message);
        this.sender = getString(params.sender);
    }
};

export default class Messages {
    constructor(params) {
        params = params ?? {};

        this.pagination = new PaginationModel(params);
        this.messages = getTypedArray(params.data, Message);
    }
};