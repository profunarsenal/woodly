<template lang="pug">
    payment-wrapper
        template(#content)
            .crypto
                .title Перевод USDT
                .subtitle Скопируйте адрес кошелька, нажав на иконку рядом с адресом или отсканируйте QR-код
                img.code(src="/images/code.png")
                ul.list
                    li.item
                        .key Адрес
                        .value TQHEfg3khEuNJQWxuXDuR7PrXTNLgPBbek
                    li.item
                        .key Сеть
                        .value TRC20
                    li.item
                        .key Сумма
                        .value 12.632 USDT
                v-button.buttons Я оплатил
</template>

<script>
import PaymentWrapper from '@/components/Payment/PaymentWrapper.vue';
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'PaymentCrypto',

    components: {
        PaymentWrapper,
        VButton,
    },
}
</script>

<style lang="sass" scoped>
.crypto
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
    .list
        display: flex
        flex-direction: column
        margin-bottom: 3.2rem
        .item
            display: flex
            justify-content: space-between
            gap: 2rem
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

</style>