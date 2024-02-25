<template lang="pug">
    .profile-cards
        .header
            .title Мои карты
            v-button(
                iconSrc="/icons/plus.svg"
                type="outline"
                size="small"
            ) Добавить
            .toggle-buttons
                v-button(
                    v-if="isActiveTransactions"
                    type="negative"
                    size="small"
                    @click="offTransactions"
                ) Выключить сделки
                v-button(
                    v-else
                    type="positive"
                    size="small"
                    @click="onTransactions"
                ) Включить сделки
        .table-wrapper
            v-table.table(
                :headItems="headItems"
                :bodyItems="bodyItems"
            )
                template(#status="{ item }")
                    inline-svg.status(
                        :class="setIcon(item.status).class"
                        :src="setIcon(item.status).src"
                    )
                template(#head)
                    th.head-item
                template(#body="{ item }")
                    td.body-item
                        profile-card-menu(:item="item")

    app-pagination
</template>

<script>
import AppPagination from '@/components/Pagination/AppPagination.vue';
import VTable from '@/components/common/VTable.vue';
import ProfileCardMenu from '@/components/Profile/ProfileCards/CardMenu.vue';
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'ProfileCards',

    components: {
        AppPagination,
        VTable,
        ProfileCardMenu,
        VButton,
    },

    data() {
        return {
            headItems: [
                {
                    title: 'ID карты',
                    key: 'id',
                },
                {
                    title: 'Название',
                    key: 'title',
                },
                {
                    title: 'Номер карты',
                    key: 'cardNumber',
                    searchable: true,
                },
                {
                    title: 'Банк',
                    key: 'bank',
                },
                {
                    title: 'Оборот',
                    key: 'turnover',
                    subtitle: 'сегодня',
                },
                {
                    title: 'Лимит',
                    key: 'limitToday',
                    subtitle: 'сегодня',
                },
                {
                    title: 'Лимит',
                    key: 'paymentLimit',
                    subtitle: 'на платеж',
                },
                {
                    title: 'Статус',
                    key: 'status',
                },
            ],
            bodyItems: [
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: false,
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: true,
                },
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: false,
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: true,
                },
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: false,
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: true,
                },
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: false,
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: true,
                },
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: false,
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: true,
                },
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: false,
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: true,
                },
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: false,
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: true,
                },
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: false,
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: true,
                },
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: false,
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: true,
                },
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: false,
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                    bank: 'Сбербанк',
                    turnover: '0 / 0',
                    limitToday: '1 000 000 / 1 000',
                    paymentLimit: '100 – 1 000 000',
                    status: true,
                },
            ],
            isActiveTransactions: false,
        }
    },

    methods: {
        setIcon(status) {
            return {
                src: status ? '/icons/checkmark-circle.svg' : '/icons/close-circle.svg',
                class: status ? 'success' : 'fail',
            };
        },

        offTransactions() {
            this.isActiveTransactions = false;
        },

        onTransactions() {
            this.isActiveTransactions = true;
        },
    },
};
</script>

<style lang="sass" scoped>
.profile-cards
    display: flex
    flex-direction: column
    margin-top: 0.8rem
    padding: 2.4rem 3.2rem
    background-color: $color-white
    border-radius: 2rem 0 0 0
    width: 100%
    flex: 1 1 auto

.header
    display: flex
    align-items: center
    justify-content: flex-start
    gap: 1.6rem
    margin-bottom: 3.2rem
    .title
        font-weight: 600
        font-size: 3.2rem
        line-height: 3.2rem
    .toggle-buttons
        margin-left: auto

.table-wrapper
    height: calc( 100vh - 230px )
    overflow-y: scroll

.status
    width: 2rem
    height: 2rem
    display: flex
    align-items: center
    justify-content: center
    margin: 0 auto
    &.success
        fill: $color-green
    &.fail
        fill: $color-red-dark

.table
    .body-item
        position: relative
</style>