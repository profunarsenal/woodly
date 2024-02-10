<template lang="pug">
    .payment-window
        .by-bank
            .title Переведите через СБП
            .window
                ul.list
                    li.item
                        .key Номер телефона
                        .value +7 985 015-48-09
                    li.item
                        .key Получатель
                        .value Егор И.
                    li.item
                        .key Банк получателя
                        .value Тинькофф
                    li.item
                        .key Сумма с комиссией
                        .value 280 руб
                .buttons
                    app-button(@click="$emit('pay')") Я оплатил
                    app-button(type="secondary") Не удается перевести по реквизитам

        .qr-code(v-if="false")
            .title Для того чтобы оплатить
            .subtitle Отсканируйте QR-код в мобильном приложении банка или штатной камерой телефона
            img.code(src="/images/code.png")
            app-button.button(@click="$emit('pay')") Я оплатил

</template>

<script>
import AppButton from '@/components/common/AppButton.vue';

export default {
    name: 'PaymentWindow',

    components: {
        AppButton,
    },

    props: {
        system: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style lang="sass" scoped>
.by-bank
    display: flex
    flex-direction: column
    width: 44.2rem
    background-color: $color-gray-light
    .title
        margin-bottom: 1.6rem
        text-align: center
        font-weight: 500
    .window
        padding: 2rem 1.6rem 1.6rem 1.6rem
        border-radius: 1.6rem
        background-color: $color-white
        .list
            display: flex
            flex-direction: column
            margin-bottom: 3.2rem
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
    .buttons
        display: flex
        flex-direction: column
        gap: 0.8rem

.qr-code
    width: 44.2rem
    padding: 2rem 1.6rem 1.6rem 1.6rem
    background-color: $color-white
    border-radius: 1.6rem
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    text-align: center
    .title
        font-weight: 500
        margin-bottom: 0.8rem
    .subtitle
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        margin-bottom: 3.2rem
        padding: 0 1.2rem
    .code
        width: 22.4rem
        height: 22.4rem
        margin-bottom: 3.2rem
    .button
        align-self: stretch
</style>