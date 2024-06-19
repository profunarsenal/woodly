<template lang="pug">
    .status
        inline-svg.icon(
            v-if="icon"
            :src="icon[status]"
        )

        .title(v-html="title[status]")

        .subtitle(v-html="subtitle[status]")

        v-loader.status-loader(v-if="isLoadingStatus")

        v-button.button(
            v-if="isSuccessStatus"
            type="secondary"
        ) Перейти на сайт магазина

        template(v-if="isFailStatus")
            v-button.button(type="secondary") Начать заново
            .or или
            v-file-loader.file-loader(:extensions="imageExtensions")
            v-button.button(disabled) Отправить на проверку

        v-button.button(
            v-if="isCanceledStatus"
            type="secondary"
        ) Вернуться на главную
</template>

<script>
import { mapGetters } from 'vuex';
import VLoader from '@/components/common/VLoader.vue';
import VButton from '@/components/common/VButton.vue';
import VFileLoader from '@/components/common/VFileLoader.vue';
import { PAYMENT_STATUSES } from '@/helpers/constants.js';

export default {
    name: 'paymentStatus',

    components: {
        VLoader,
        VButton,
        VFileLoader,
    },

    props: {
        status: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            imageExtensions: '.jpg, .gif, .jpeg, .png, .webp',
        };
    },

    computed: {
        ...mapGetters({
            isLoadingStatus: 'payment/isLoadingStatus',
            isSuccessStatus: 'payment/isSuccessStatus',
            isFailStatus: 'payment/isFailStatus',
            isCanceledStatus: 'payment/isCanceledStatus',
        }),

        icon() {
            return {
                [PAYMENT_STATUSES.fail]: '/icons/fail.svg',
                [PAYMENT_STATUSES.success]: '/icons/check.svg',
                [PAYMENT_STATUSES.cancelled]: '/icons/fail.svg',
                [PAYMENT_STATUSES.loading]: '',
            };
        },

        title() {
            return {
                [PAYMENT_STATUSES.fail]: 'Время истекло или <br> не удалось обработать ваш платеж',
                [PAYMENT_STATUSES.success]: 'Платеж успешно зачислен',
                [PAYMENT_STATUSES.cancelled]: 'Пополнение отменено',
                [PAYMENT_STATUSES.loading]: 'Ожидаем поступления платежа',
            };
        },

        subtitle() {
            return {
                [PAYMENT_STATUSES.fail]: 'Начните заново или, если вы оплатили — прикрепите чек для проверки платежа',
                [PAYMENT_STATUSES.success]: 'Вы можете перейти на сайт магазина, <br> нажав кнопку ниже',
                [PAYMENT_STATUSES.cancelled]: 'Вы можете вернуться на главную страницу нажав кнопку ниже',
                [PAYMENT_STATUSES.loading]: 'Не закрывайте страницу. Перевод зачисляется автоматически.',
            };
        },
    },
};
</script>


<style lang="sass" scoped>
.status
    padding: 2rem 1.6rem 1.6rem 1.6rem
    background-color: $color-white
    width: 44.2rem
    border-radius: 1.6rem
    display: flex
    flex-direction: column
    align-items: center
    text-align: center
    .title
        font-weight: 500
        margin-bottom: 0.8rem
    .icon
        width: 6.4rem
        height: 6.4rem
        margin-bottom: 1.6rem
    .subtitle
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        padding: 0 1.2rem
        margin-bottom: 4rem
    .button
        width: 100%
        align-self: stretch
    .or
        margin: 1.2rem 0
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
    .status-loader
        width: 6.4rem
        height: 6.4rem
        fill: $color-violet-100
        margin-bottom: 2.4rem
    .file-loader
        margin-bottom: 0.8rem
        width: 100%
</style>
