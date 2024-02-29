<template lang="pug">
    .card-messages
        .header
            button-arrow.back(@click="back")
            .title Общие СМС по карте
            .subtitle Судоргина 56 №16
        .table-wrapper
            v-table(
                :headers="headItems"
                :items="bodyItems"
            )
</template>

<script>
import ButtonArrow from '@/components/app/ButtonArrow.vue';
import VTable from '@/components/common/VTable.vue';

export default {
    name: 'AutoPayments',

    components: {
        ButtonArrow,
        VTable,
    },

    data() {
        return {
            headItems: [
                {
                    title: 'ID СМС',
                    key: 'id',
                },
                {
                    title: 'Отправитель',
                    key: 'send',
                },
                {
                    title: 'Описание',
                    key: 'descr',
                },
                {
                    title: 'Дата и время',
                    key: 'date',
                },
            ],
            bodyItems: [
                {
                    send: '900',
                    descr: 'Ваша карта уже в офисе: г. Барнаул пр-т Красноармейский 58а/1 . Она хранится 6 месяцев. Чтобы получить карту, возьмите паспорт и телефон. Информация о получении sberbank.com',
                    date: '12.02.2024 · 03:07:11',
                    id: 32707571,
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
.card-messages
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