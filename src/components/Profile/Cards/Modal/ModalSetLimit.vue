<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Установка лимитов
        .form
            v-input(
                v-model="form.paymentsLimitPerDay"
                label="Суточный оборот"
                type="number"
            )
            v-input(
                v-model="form.transactionsLimitPerDay"
                label="Максимальное количество платежей (сутки)"
                type="number"
            )
            v-input(
                v-model="form.paymentMin"
                label="Минимальный платеж"
                type="number"
            )
            v-input(
                v-model="form.paymentMax"
                label="Максимальный платеж"
                type="number"
            )
        v-button.button(@click="saveLimit") Подтвердить
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'ModalSetLimit',

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
            form: {
                paymentsLimitPerDay: 0,
                transactionsLimitPerDay: 0,
                paymentMin: 0,
                paymentMax: 0,
            },
        };
    },

    computed: {
        cardId() {
            return this.componentData?.cardId || 0;
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        getLimits() {
            const formKeys = Object.keys(this.form);

            formKeys.forEach((key) => {
                if (this.componentData.hasOwnProperty(key)) {
                    this.form[key] = this.componentData[key];
                }
            });
        },

        async saveLimit() {
            const form = {
                paymentsLimitPerDay: +this.form.paymentsLimitPerDay,
                transactionsLimitPerDay: +this.form.transactionsLimitPerDay,
                paymentMin: +this.form.paymentMin,
                paymentMax: +this.form.paymentMax,
            };
            await this.$api.cards.setLimit({
                ...form,
                cardId: this.cardId,
            });
            this.close();
            this.$store.dispatch('cards/getCards', this.$route.query);
        },
    },

    mounted() {
        this.getLimits();
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