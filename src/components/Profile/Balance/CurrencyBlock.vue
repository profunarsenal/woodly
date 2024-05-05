<template lang="pug">
    .currency
        .image-wrapper
            inline-svg(:src="imageSrc")
        .items
            .item
                .title Баланс в рублях
                .balance
                    .value {{ getCurrencyValue(balance.balanceRub) }}
                    .button
                        button-mini(
                            type="payout"
                            @click="openModalTransaction"
                        )
                        v-tooltip.table-tooltip.left(
                            position="left"
                            text="Перевести средства"
                        )
            .item
                .title Заморожено
                .value {{ getCurrencyValue(balance.balanceRubFreeze) }}
            .item
                .title USDT / RUB
                .currencies
                    .value {{ balance.rate }}
                    v-badge.percent(
                        v-if="balance.percent"
                        type="positive"
                        :value="balance.percent"
                    )

                    .value
                        span.slash /
                        | {{ balance.rateWithPercent }}
            .item
                .title Ваш кошелек USDT (TRC20) RUB
                .crypto
                    .value {{ balance.tokenId }}
                    .button
                        button-mini(type="qr")
                        v-tooltip.table-tooltip.right(
                            position="right"
                            text="Открыть QR-код"
                        )
</template>

<script>
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import VBadge from '@/components/common/VBadge.vue';
import VTooltip from '@/components/common/VTooltip.vue';
import { getCurrencyValue } from '@/helpers/string';

export default {
    name: 'CurrencyBlock',

    components: {
        ButtonMini,
        VBadge,
        VTooltip,
    },

    props: {
        imageSrc: {
            type: String,
            required: true,
        },

        balance: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            getCurrencyValue: getCurrencyValue,
        };
    },

    methods: {
        openModalTransaction() {
            this.$store.commit('modal/open', {
                component: 'ModalTransaction',
                positionCenter: true,
            });
        },
    },
};
</script>

<style lang="sass" scoped>
.currency
    position: relative
    display: flex
    align-items: center
    width: 100%
    border-radius: 1.6rem
    background-color: $color-gray-light-2
    &::before
        content: ''
        position: absolute
        top: 0
        left: 0
        width: 5.6rem
        height: 100%
        background-color: $color-gray-light
        border-radius: 1.6rem 0 0 1.6rem

.image-wrapper
    position: relative
    z-index: 1
    display: flex
    align-items: center
    justify-content: center
    flex: 0 0 5.6rem

.button
    position: relative
    &:hover
        .table-tooltip
            opacity: 1
            visibility: visible
            pointer-events: all
            transition: 0.4s ease 0.4s

.table-tooltip
    z-index: 99
    opacity: 0
    visibility: hidden
    pointer-events: none
    top: -0.3rem
    transition: 0.2s ease
    &.left
        left: calc( 100% + 1.2rem )
    &.right
        right: calc( 100% + 1.2rem )

.items
    display: flex
    align-items: center
    flex: 1
    padding: 1.6rem 2rem 2rem 2rem

.item
    position: relative
    padding: 0 1.6rem
    flex: 1
    &:first-child
        padding: 0 1.6rem 0 0
    &:last-child
        padding-right: 0
    &:not(&:last-child)
        &::after
            content: ''
            position: absolute
            top: 0
            right: 0
            height: 100%
            width: 0.1rem
            background-color: $color-gray-100

.title
    margin-bottom: 0.4rem
    font-weight: 500
    font-size: 1.2rem
    line-height: 1.8rem
    color: $color-gray-dark

.value
    font-weight: 600
    font-size: 1.6rem
    line-height: 2.4rem

.balance,
.crypto
    display: flex
    align-items: center
    justify-content: space-between
    gap: 1.6rem

.currencies
    display: flex
    align-items: center

.percent
    display: inline-block
    margin-left: 0.8rem

.slash
    margin: 0 0.8rem
    color: $color-silver-light
</style>