<template lang="pug">
    payment-wrapper
        template(#content)
            .acquiring
                .form
                    v-input(
                        v-model="card.number"
                        label="Номер карты"
                        placeholder="_ _ _ _-_ _ _ _-_ _ _ _-_ _ _ _"
                    )
                    .group
                        v-input(
                            v-model="card.date"
                            label="Срок действия"
                            placeholder="00 / 00"
                        )
                        v-input(
                            v-model="card.code"
                            label="CVV / CVC"
                            placeholder="000"
                        )
                    v-input(
                        v-model="card.name"
                        label="Владелец карты"
                        placeholder="IVAN IVANOV"
                    )

                v-button.button(disabled) Оплатить

            .pay-systems
                .system
                    img.image(src="/images/paymentSystems/pci.png")
                .system
                    img.image(src="/images/paymentSystems/ms.png")
                .system
                    img.image(src="/images/paymentSystems/visa.png")
</template>

<script>
import PaymentWrapper from '@/components/Payment/PaymentWrapper.vue';
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'PaymentAcquiring',

    components: {
        PaymentWrapper,
        VInput,
        VButton,
    },

    data() {
        return {
            card: {
                number: '',
                date: '',
                code: '',
                name: '',
            },
        };
    },
};
</script>

<style lang="sass" scoped>
.acquiring
    padding: 2rem 1.6rem 1.6rem 1.6rem
    background-color: $color-white
    border-radius: 1.6rem
    margin-bottom: 1.6rem
    .form
        display: flex
        flex-direction: column
        gap: 2rem
        margin-bottom: 3.2rem
    .group
        display: flex
        gap: 1.6rem
        &:deep(.input-wrapper)
            width: 19.7rem
    .button
        width: 100%

.pay-systems
    display: flex
    gap: 1.2rem
    .system
        flex: 1 1 32%
        display: flex
        align-items: center
        justify-content: center
        background-color: $color-white
        border-radius: 1.6rem
        height: 8.8rem
        .image
            width: 10rem
            height: 4.4rem
</style>