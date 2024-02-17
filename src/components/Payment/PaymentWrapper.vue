<template lang="pug">
    .payment(:class="loadingClass")
        .screen-loading(v-if="isLoading")
            v-loader.loader
            .text Загрузка реквизитов для перевода
        template(v-else)
            .content
                .logo
                    img(src="/images/logo.png")

                .timer(v-if="!isCanceledStatus")
                    .text Осталось времени на оплату
                    .time
                        inline-svg.icon(src="/icons/time.svg")
                        .value {{ time }}

                button.cancel(
                    v-if="!isCanceledStatus"
                    @click="openModalCancel"
                )
                    inline-svg.icon(src="/icons/close-large.svg")

                .support
                    button.button
                        inline-svg.icon(src="/icons/chat.svg")

                payment-details(:details="paymentDetails")

                slot(name="content")

            slot(name="buttons")
</template>

<script>
import { mapGetters } from 'vuex';
import PaymentDetails from '@/components/Payment/PaymentDetails.vue';
import VLoader from '@/components/common/VLoader.vue';
import { PAYMENT_INFO } from '@/helpers/testData';

export default {
    name: 'PaymentLayout',

    components: {
        PaymentDetails,
        VLoader,
    },

    data() {
        return {
            timer: null,
            time: '--:--',
            isLoading: false,
            paymentDetails: PAYMENT_INFO,
        };
    },

    computed: {
        ...mapGetters({
            isCanceledStatus: 'payment/isCanceledStatus',
        }),

        loadingClass() {
            return { loading: this.isLoading };
        },
    },

    methods: {
        openModalCancel() {
            this.$store.commit('modal/open', {
                component: 'ModalCancelPayment',
                positionCenter: true,
            });
        },

        startTimer() {
            const TIMER_MINUTES = 25;
            const duration = TIMER_MINUTES * 60 * 1000;
            const startTime = Date.now();

            this.timer = setInterval(() => {
                const elapsed = Date.now() - startTime;
                const remaining = duration - elapsed;
                const minutes = Math.floor(remaining / (1000 * 60));
                const seconds = Math.floor((remaining % (1000 * 60)) / 1000);

                const formatMinutes = minutes < 10 ? `0${minutes}` : minutes;
                const formatSeconds = seconds < 10 ? `0${seconds}` : seconds;
                
                this.time = `${formatMinutes}:${formatSeconds}`;

                if (remaining <= 0) {
                    clearInterval(this.timer);
                }
            }, 1000)
        },
    },

    mounted() {
        this.startTimer();
    },

    beforeUnmount() {
        clearInterval(this.timer);
    },
};
</script>

<style lang="sass" scoped>
.payment
    position: relative
    display: flex
    flex-direction: column
    justify-content: space-between
    align-items: center
    min-height: 100vh
    padding: 3.2rem
    background-color: $color-gray-light
    &.loading
        padding: 0
        justify-content: center

.screen-loading
    display: flex
    flex-direction: column
    align-items: center
    gap: 2.4rem
    .loader
        width: 6.4rem
        height: 6.4rem
        fill: $color-violet-100
    .text
        font-size: 1.4rem
        line-height: 2rem
        letter-spacing: 0.028rem

.content
    display: flex
    flex-direction: column
    width: 44.2rem
    margin: 0 auto

.logo
    margin-bottom: 1.6rem
    text-align: center
    img
        width: 13.4rem
        height: 3.2rem

.timer
    position: absolute
    top: 3.2rem
    left: 3.2rem
    display: flex
    align-items: center
    gap: 1.6rem
    padding: 1.2rem 1.6rem
    height: 4.4rem
    background-color: $color-white
    border-radius: 1.2rem
    .text
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        letter-spacing: -0.028rem
    .time
        display: flex
        align-items: center
        gap: 0.8rem
        .value
            font-weight: 500
            letter-spacing: -0.032rem

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

.support
    position: fixed
    z-index: 99
    bottom: 3.2rem
    right: 3.2rem
    &::after
        content: ''
        position: absolute
        top: 50%
        left: 50%
        width: 10.4rem
        height: 10.4rem
        background-color: $color-violet-30
        border-radius: 50%
        transform: translate(-50%,-50%) scale(0)
        transition: all 0.2s ease
    @media(any-hover:hover)
        &:hover
            &::after
                transform: translate(-50%,-50%) scale(1)
    .button
        position: relative
        z-index: 1
        width: 8rem
        height: 8rem
        border-radius: 50%
        background-color: $color-violet-100
    .icon
        fill: $color-white
</style>