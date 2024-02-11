<template lang="pug">
    .payment
        img.logo(src="/images/logo.png")
        button.cancel(@click="openModalCancel")
            inline-svg.icon(src="/icons/close-large.svg")

        .info
            ul.list
                li.item(
                    v-for="item in paymentInfo"
                    :key="item.id"
                )
                    inline-svg.icon(:src="item.icon")
                    .key {{ item.key }}
                    .value {{ item.value }}

        payment-status(
            v-if="paymentStatus"
            :status="paymentStatus"
        )

        template(v-else)
            payment-systems(
                v-if="paymentSystems.length && !selectedSystem"
                :systems="paymentSystems"
                @select="selectPaymentSystem"
            )

            payment-window(
                v-if="selectedSystem"
                :system="selectedSystem"
                @pay="pay"
            )
</template>

<script>
import PaymentSystems from '@/components/Payment/PaymentSystems.vue';
import PaymentWindow from '@/components/Payment/PaymentWindow/PaymentWindow.vue';
import PaymentStatus from '@/components/Payment/PaymentWindow/PaymentStatus.vue';
import { PAYMENT_INFO, PAYMENT_SYSTEMS } from '@/helpers/testData';
import { PAYMENT_STATUSES } from '@/helpers/constants.js';

export default {
    name: 'Payment',

    components: {
        PaymentSystems,
        PaymentWindow,
        PaymentStatus,
    },

    data() {
        return {
            selectedSystem: null,
            paymentStatus: '',
        };
    },

    methods: {
        selectPaymentSystem(system) {
            this.selectedSystem = system;
        },

        pay() {
            this.paymentStatus = PAYMENT_STATUSES.loading;
        },

        openModalCancel() {
            this.$store.commit('modal/open', {
                component: 'ModalCancelPayment',
                positionCenter: true,
            });
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
    position: relative
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

.cancel
    position: absolute
    z-index: 10
    top: 3.2rem
    right: 3.2rem
    width: 4.4rem
    height: 4.4rem
    display: flex
    align-items: center
    justify-content: center
    border-radius: 1.2rem
    background-color: $color-white
    transition: all 0.3s ease
    &::after
        content: 'Отменить пополнение'
        position: absolute
        display: flex
        align-items: center
        justify-content: center
        top: 0
        right: 4rem
        background-color: $color-white
        width: auto
        height: 100%
        padding: 1rem 0 1rem 1.6rem
        border-radius: 1.2rem 0 0 1.2rem
        opacity: 0
        visibility: hidden
        pointer-events: none
        white-space: nowrap
        transition: all 0.3s ease
    @media(any-hover:hover)
        &:hover
            border-radius: 0 1.2rem 1.2rem 0
            &::after
                opacity: 1
                visibility: visible
                pointer-events: all
                right: 4.4rem

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
</style>