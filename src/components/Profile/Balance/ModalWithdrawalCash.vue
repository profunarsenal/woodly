<template lang="pug">
    .wrapper
        template(v-if="isCreated")
            .success
                inline-svg(src="/icons/check.svg")
                .title {{ $lang.withdrawalCompletedSuccessfully }}
            v-button.button(
                size="large"
                type="secondary"
                @click="close"
            ) {{ $lang.ready }}
        template(v-else)
            button.close(@click="close")
                inline-svg.icon(src="/icons/close.svg")
            .title {{ $lang.creatingWithdrawalCash }}
            .form
                v-input(
                    v-model="address"
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
                :isLoading="isLoading"
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
            address: '',
            amount: '',
            isLoading: false,
            isCreated: false,
        };
    },

    computed: {
        isButtonDisabled() {
            return !this.address || !this.amount;
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        async create() {
            try {
                this.isLoading = true;
                await this.$api.withdrawals.createWithdrawal({
                    address: this.address,
                    amount: +this.amount,
                });
                this.isCreated = true;
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
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

.success
    padding: 8rem 0
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    gap: 1.6rem
    .title
        margin: 0
</style>