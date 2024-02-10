<template lang="pug">
    .payment
        img.logo(src="/images/logo.png")

        .info
            ul.list
                li.item(
                    v-for="item in paymentInfo"
                    :key="item.id"
                )
                    inline-svg.icon(:src="item.icon")
                    .key {{ item.key }}
                    .value {{ item.value }}

        //- template(v-if="isPaymentMode")
        //-     payment-systems(
        //-         v-if="paymentSystems.length && !selectedSystem"
        //-         :systems="paymentSystems"
        //-         @select="selectPaymentSystem"
        //-     )

        //-     payment-window(
        //-         v-if="selectedSystem && !isLoading"
        //-         :system="selectedSystem"
        //-         @pay="pay"
        //-     )

        //- template(v-else)
        //-     .waiting-payment(v-if="isLoading")
        //-         .title Ожидаем поступления платежа
        //-         .subtitle Не закрывайте страницу. Перевод зачисляется автоматически.
        //-         app-loader

        //-     .success(v-if="isPaid")
        //-         inline-svg.icon(src="/icons/check.svg")
        //-         .title Платеж успешно зачислен
        //-         .subtitle Вы можете перейти на сайт магазина, нажав кнопку ниже
        //-         app-button.button(type="secondary") Перейти на сайт магазина

        .fail
            inline-svg.icon(src="/icons/fail.svg")
            .title Время истекло или
                br
                | не удалось обработать ваш платеж
            .subtitle Начните заново или, если вы оплатили — прикрепите чек для проверки платежа
            app-button.button(type="secondary") Начать заново
            .or или
            file-loader.file-loader
            app-button.button(disabled) Отправить на проверку
</template>

<script>
import PaymentSystems from '@/components/Payment/PaymentSystems.vue';
import PaymentWindow from '@/components/Payment/PaymentWindow/PaymentWindow.vue';
import AppLoader from '@/components/common/AppLoader.vue';
import AppButton from '@/components/common/AppButton.vue';
import FileLoader from '@/components/common/FileLoader.vue';
import { PAYMENT_INFO, PAYMENT_SYSTEMS } from '@/helpers/testData';

export default {
    name: 'Payment',

    components: {
        PaymentSystems,
        PaymentWindow,
        AppLoader,
        AppButton,
        FileLoader,
    },

    data() {
        return {
            selectedSystem: null,
            isPaymentMode: true,
            isLoading: false,
            isPaid: false,
        };
    },

    methods: {
        selectPaymentSystem(system) {
            this.selectedSystem = system;
        },

        pay() {
            this.isPaymentMode = false;
            this.isLoading = true;
            setTimeout(() => {
                this.isLoading = false,
                this.isPaid = true;
            }, 2000);
        },
    },

    created() {
        this.paymentInfo = PAYMENT_INFO;
        this.paymentSystems = PAYMENT_SYSTEMS;
    },
};
</script>

<style lang="sass" scoped>
.payment
    display: flex
    flex-direction: column
    align-items: center
    min-height: 100vh
    padding: 3.2rem
    background-color: $color-gray-light

.logo
    margin-bottom: 1.6rem
    width: 13.4rem
    height: 3.2rem

.info
    margin-bottom: 1.6rem
    width: 44.2rem
    padding: 2rem 1.6rem
    border-radius: 1.6rem
    background-color: $color-white
    .list
        display: flex
        flex-direction: column
    .item
        display: flex
        align-items: center
        gap: 1.6rem
        padding: 1.6rem 0
        &:first-child
            padding-top: 0
        &:last-child
            padding-bottom: 0
        &:not(:last-child)
            border-bottom: 0.1rem solid $color-gray-divider
        .icon
            fill: $color-gray-dark
        .key
            color: $color-gray-dark
        .value
            margin-left: auto
            font-weight: 500

.waiting-payment
    padding: 2rem 1.6rem 4rem
    background-color: $color-white
    width: 44.2rem
    border-radius: 1.6rem
    text-align: center
    .title
        font-weight: 500
        margin-bottom: 0.8rem
    .subtitle
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        margin-bottom: 4rem
        padding: 0 1.2rem
    &:deep(.loader)
        width: 6.4rem
        height: 6.4rem
        fill: $color-violet-100

.success
    display: flex
    flex-direction: column
    align-items: center
    padding: 2rem 1.6rem 1.6rem 1.6rem
    background-color: $color-white
    width: 44.2rem
    border-radius: 1.6rem
    text-align: center
    .icon
        width: 6.4rem
        height: 6.4rem
        margin-bottom: 1.6rem
    .title
        font-weight: 500
        margin-bottom: 0.8rem
    .subtitle
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        margin: 0 auto
        margin-bottom: 4rem
        max-width: 30rem
    .button
        width: 100%

.fail
    padding: 2rem 1.6rem 1.6rem 1.6rem
    background-color: $color-white
    width: 44.2rem
    border-radius: 1.6rem
    display: flex
    flex-direction: column
    align-items: center
    text-align: center
    .icon
        width: 6.4rem
        height: 6.4rem
        margin-bottom: 1.6rem
    .title
        font-weight: 500
        margin-bottom: 0.8rem
    .subtitle
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        margin-bottom: 4rem
        padding: 0 1.2rem
    .button
        align-self: stretch
    .or
        margin: 1.2rem 0
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
    .file-loader
        margin-bottom: 0.8rem
        width: 100%
</style>