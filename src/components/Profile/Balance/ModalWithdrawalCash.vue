<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title {{ $lang.creatingWithdrawalCash }}
        .form
            v-input(
                v-model="walletNumber"
                :label="$lang.walletNumber"
                :placeholder="$lang.enterWalletNumber"
            )
            v-input(
                v-model="amount"
                type="number"
                :label="$lang.withdrawalAmount"
                :placeholder="$lang.enterWithdrawalAmount"
            )
        v-button.button(
            :isDisabled="isButtonDisabled"
            @click="create"
        ) {{ $lang.create }}
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'ModalWithdrawalCash',

    components: {
        VInput,
        VButton,
    },

    props: {
        componentData: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            walletNumber: '',
            amount: '',
        };
    },

    computed: {
        isButtonDisabled() {
            return !this.walletNumber || !this.amount;
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        create() {
            console.log('create');
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
        margin-bottom: 3.2rem
    .form
        display: flex
        flex-direction: column
        gap: 2rem
        margin-bottom: 4rem
    .button
        width: 100%
</style>