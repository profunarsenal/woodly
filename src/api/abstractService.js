import request from '@/helpers/http';

export default class AbstractService {
    constructor() {
        this.axios = request;
    }
};