<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title {{ $lang.createNewPayout }}
        .form
            v-dropdown(
                v-model="form.cashbox"
                :list="cashboxesList"
                :label="$lang.cashbox"
                :placeholder="$lang.chooseCashbox"
            )
            v-dropdown(
                v-model="form.paymentSystem"
                :list="paymentSystems"
                :label="$lang.paymentSystem"
                :placeholder="$lang.choosePaymentSystem"
                @onChange="clearRequisites"
            )
            v-dropdown(
                v-model="form.bankType"
                :list="banks"
                :label="$lang.bank"
                :placeholder="$lang.chooseBank"
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
                v-model="form.requisites"
                v-mask="maskForRequisites"
                :isDisabled="!form.paymentSystem"
                :label="$lang.recipientRequisites"
                :placeholder="$lang.enterRecipientRequisites"
            )
        v-button.button(
            :isLoading="isPending"
            @click="create"
        ) {{ $lang.create }}
</template>

<script>
import { mask } from 'vue-the-mask';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import VDropdown from '@/components/common/VDropdown.vue';

import { BANKS, CURRENСIES } from '@/helpers/testData';

const PAYMENT_SYSTEM_IDS = {
    bank: 1,
    sbp: 2,
};

export default {
    name: 'ModalCard',

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

    directives: { mask },

    data() {
        return {
            form: {
                cashbox: null,
                paymentSystem: null,
                bankType: null,
                currency: null,
                amount: '',
                orderNumber: '',
                requisites: '',
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

        isBankSystem() {
            return this.form.paymentSystem === PAYMENT_SYSTEM_IDS.bank;
        },

        maskForRequisites() {
            if (this.isBankSystem) {
                return '#### #### #### ####';
            } else {
                return '+7(###)-###-##-##';
            }
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        async create() {
            const requisites = this.isBankSystem ? this.form.requisites.split(' ').join('') : this.form.requisites;
            const form = {
                ...this.form,
                amount: +this.form.amount,
                orderNumber: +this.form.orderNumber,
                requisites,
            };

            try {
                this.isPending = true;
                await this.$api.purchases.createPurchase(form);
                await this.$store.dispatch('purchases/getPurchases', this.$route.query);
                this.close();
            } catch (error) {
                console.log(error);
            } finally {
                this.isPending = false;
            }
        },

        clearRequisites() {
            this.form.requisites = '';
        },
    },

    created() {
        this.paymentSystems = [
            { id: 1, title: this.$lang.bankCard },
            { id: 2, title: this.$lang.sbp },
        ];
        this.banks = BANKS;
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