<template lang="pug">
    .auto-payments
        .header
            square-button.back(
                icon="/icons/arrow.svg"
                @click="back"
            )
            .title Автоплатежи по карте
            .subtitle Судоргина 56 №16
        .table-wrapper
            v-table(
                :headers="headItems"
                :items="bodyItems"
            )
</template>

<script>
import SquareButton from '@/components/common/Buttons/SquareButton.vue';
import VTable from '@/components/common/VTable.vue';

export default {
    name: 'AutoPayments',

    components: {
        SquareButton,
        VTable,
    },

    data() {
        return {
            headItems: [
                {
                    title: 'ID платежа',
                    key: 'id',
                },
                {
                    title: 'Платеж',
                    key: 'payment',
                },
                {
                    title: 'Карта',
                    key: 'card',
                },
                {
                    title: 'Сумма',
                    key: 'sum',
                },
                {
                    title: 'Дата и время',
                    key: 'date',
                },
                {
                    title: 'Описание',
                    key: 'descr',
                },
            ],
            bodyItems: [
                {
                    id: 21367690,
                    payment: 'Не найдено',
                    card: '6554',
                    sum: '4 300.00',
                    date: '12.02.2024',
                    descr: 'MIR-6554 · 03:06 · Перевод 4 300₽ от Артем А. · Баланс: 65 944.92₽',
                },
            ],
        };
    },

    methods: {
        back() {
            this.$router.push('/profile/cards');
        },
    },
};
</script>

<style lang="sass" scoped>
.auto-payments
    margin-top: 0.8rem
    padding: 2.4rem 3.2rem
    background-color: $color-white
    border-radius: 2rem 0 0 0
    width: 100%
    flex: 1 1 auto
    .header
        display: flex
        align-items: center
        gap: 1.6rem
        margin-bottom: 3.2rem
        .title,
        .subtitle
            font-weight: 600
            font-size: 3.2rem
            line-height: 3.2rem
        .subtitle
            color: $color-gray-dark
</style>