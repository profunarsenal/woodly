import ApiModule from '@/api/apiModule';

export default {
    install: (app) => {
        app.config.globalProperties.$api = new ApiModule();
    },
};