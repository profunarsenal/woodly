<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title {{ $lang.creatingNewPayment }}
        .form
            v-dropdown(
                v-model="form.cashboxId"
                :list="cashboxesList"
                :label="$lang.cashbox"
                :placeholder="$lang.chooseCashbox"
            )
            v-dropdown(
                v-model="form.paymentSystem"
                :list="paymentSystems"
                :label="$lang.paymentSystem"
                :placeholder="$lang.choosePaymentSystem"
            )
            v-input(
                v-model="form.amount"
                :label="$lang.amount"
                :placeholder="$lang.enterAmount"
                type="number"
            )
            v-input(
                v-model="form.orderNumber"
                :label="$lang.orderNumber"
                :placeholder="$lang.enterOrderNumber"
                type="number"
            )
            v-dropdown(
                v-model="form.currency"
                :list="currencies"
                :label="$lang.currency"
                :placeholder="$lang.chooseCurrency"
            )
            v-input(
                v-model="form.clientNumber"
                :label="$lang.client"
                :placeholder="$lang.enterClientNumber"
            )
        v-button.button(
            :isLoading="isPending"
            size="large"
            @click="create"
        ) {{ $lang.create }}
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import VDropdown from '@/components/common/VDropdown.vue';

import { CURRENСIES } from '@/helpers/testData';

export default {
    name: 'ModalCreatePayment',

    components: {
        VInput,
        VButton,
        VDropdown,
    },

    props: {
        componentData: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            form: {
                cashboxId: null,
                paymentSystem: null,
                currency: null,
                amount: '',
                orderNumber: '',
                clientNumber: '',
            },
            isPending: false,
        };
    },

    computed: {
        cashboxesList() {
            const cashboxes = this.componentData?.cashboxes || [];
    
            return cashboxes.map((cashbox) => {
                return {
                    id: cashbox.cashboxId,
                    title: cashbox.title,
                };
            });
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        async create() {
            const form = this.form;

            form.amount = +this.form.amount;
            form.orderNumber = +this.form.orderNumber;

            try {
                this.isPending = true;
                await this.$api.transactions.createTransaction(this.form);
                await this.$store.dispatch('transactions/getTransactions', this.$route.query);
                this.close();
            } catch (error) {
                console.log(error);
            } finally {
                this.isPending = false;
            }
        },
    },

    created() {
        this.paymentSystems = [
            { id: 1, title: this.$lang.bankCard },
            { id: 2, title: this.$lang.sbp },
        ];

        this.currencies = CURRENСIES;
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