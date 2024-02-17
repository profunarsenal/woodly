<template lang="pug">
    payment-wrapper
        template(#content)
            .qr-code
                .title Для того чтобы оплатить
                .subtitle Отсканируйте QR-код в мобильном приложении банка или штатной камерой телефона
                img.code(src="/images/code.png")
                v-button.buttons Я оплатил
</template>

<script>
import PaymentWrapper from '@/components/Payment/PaymentWrapper.vue';
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'PaymentQrCode',

    components: {
        PaymentWrapper,
        VButton,
    },
}
</script>

<style lang="sass" scoped>
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