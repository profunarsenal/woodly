import lang from '@/lang/ru';

export default {
    install: (app) => {
        app.config.globalProperties.$lang = lang;
    },
};