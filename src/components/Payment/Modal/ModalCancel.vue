<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Отменить пополнение?
        .text Если вы уже перевели деньги, после отмены обратитесь в поддержку. При частой отмене система может временно приостановить возможность пополнения.
        .buttons
            v-button(
                type="negative"
                @click="cancelPayment"
            ) Отменить
            v-button(
                type="secondary"
                @click="close"
            ) Назад
</template>

<script>
import VButton from '@/components/common/VButton.vue';
import { PAYMENT_STATUSES } from '@/helpers/constants.js';

export default {
    name: 'ModalCancelPayment',

    components: {
        VButton,
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        cancelPayment() {
            this.$store.commit('payment/setStatus', PAYMENT_STATUSES.cancelled);
            this.close();
        },
    },
};
</script>

<style lang="sass" scoped>
.wrapper
    position: relative
    width: 44.2rem
    padding: 2rem 2.4rem 2.4rem 2.4rem
    background-color: $color-white
    border-radius: 2.4rem
    .close
        position: absolute
        top: 2.4rem
        right: 2.4rem
        width: 2rem
        height: 2rem
        .icon
            fill: $color-gray-dark
            transition: fill 0.3s ease
        @media(any-hover:hover)
            &:hover
                .icon
                    fill: $color-black
    .title
        font-size: 2rem
        font-weight: 600
        line-height: 2.8rem
        margin-bottom: 1.6rem
    .text
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        margin-bottom: 4rem
    .buttons
        display: flex
        align-items: center
        gap: 0.8rem
        &:deep(.button)
            flex: 1
</style>