<template lang="pug">
    .profile-sale
        .header
            .title Продажа
            v-button(
                type="outline"
                iconSrc="/icons/download.svg"
                size="small"
            ) Экспорт
        v-tabs.table-tabs(
            v-model="activeTab"
            :tabs="tableTabs"
        )
        v-table.table(
            :headers="tableHeaders"
            :items="tableItems"
        )
            template(#card="{ item: card }")
                .card-number {{ card.number }}
                .card-name {{ card.name }}
            template(#status="{ item: status }")
                .status
                    inline-svg.status-icon(
                        :src="setStatus(status, 'icon')"
                        :class="status"
                    )
                    .status-text {{ setStatus(status, 'title') }}
            template(#thead)
                th.thead-item(colspan="2")
            template(#tbody="{ item }")
                td.tbody-item
                    button-mini(type="receipt")
                td.tbody-item
                    button-mini(type="payout")
    app-pagination.pagination
</template>

<script>
import AppPagination from '@/components/Pagination/AppPagination.vue';
import VButton from '@/components/common/VButton.vue';
import VTabs from '@/components/common/VTabs.vue';
import VTable from '@/components/common/VTable.vue';
import ButtonMini from '@/components/app/ButtonMini.vue';

const SALE_STATUSES = {
    all: {
        key: 'all',
        title: 'Все сделки',
    },
    active: {
        key: 'active',
        icon: '/icons/activity.svg',
        title: 'Активные',
    },
    review: {
        key: 'review',
        icon: '/icons/spinner.svg',
        title: 'На проверке',
        color: 'yellow',
    },
    canceled: {
        key: 'canceled',
        icon: '/icons/close.svg',
        title: 'Отмененные',
        color: 'red',
    },
    successful: {
        key: 'successful',
        icon: '/icons/checkbox-mark.svg',
        title: 'Успешные',
        color: 'green',
    },
};

export default {
    name: 'ProfileSale',

    components: {
        AppPagination,
        VButton,
        VTabs,
        VTable,
        ButtonMini,
    },

    data() {
        return {
            activeTab: SALE_STATUSES.all.key,
            tableTabs: Object.values(SALE_STATUSES),
            tableHeaders: [
                { title: 'ID сделки', key: 'id', searchable: true },
                { title: 'Название и номер карты', key: 'card', searchable: true },
                { title: 'Сумма', key: 'total', searchable: true },
                { title: 'Статус', key: 'status' },
                { title: 'Создан', key: 'dateCreated' },
                { title: 'Закрытие', key: 'dateClosed' },
            ],
            tableItems: [
                {
                    id: 22157,
                    card: {
                        number: '2202 2063 4369 7277',
                        name: 'Горохова 7 №18',
                    },
                    total: '20 000.00₽',
                    status: 'canceled',
                    dateCreated: '24.05.2023',
                    dateClosed: '24.05.2023',
                },
                {
                    id: 22158,
                    card: {
                        number: '2202 2063 4369 7277',
                        name: 'Горохова 7 №18',
                    },
                    total: '20 000.00₽',
                    status: 'active',
                    dateCreated: '24.05.2023',
                    dateClosed: '24.05.2023',
                },
                {
                    id: 22159,
                    card: {
                        number: '2202 2063 4369 7277',
                        name: 'Горохова 7 №18',
                    },
                    total: '20 000.00₽',
                    status: 'successful',
                    dateCreated: '24.05.2023',
                    dateClosed: '24.05.2023',
                },
                {
                    id: 22160,
                    card: {
                        number: '2202 2063 4369 7277',
                        name: 'Горохова 7 №18',
                    },
                    total: '20 000.00₽',
                    status: 'review',
                    dateCreated: '24.05.2023',
                    dateClosed: '24.05.2023',
                },
            ],
        };
    },

    methods: {
        setStatus(status, key) {
            switch (status) {
                case SALE_STATUSES.active.key:
                    return SALE_STATUSES.active[key];
                case SALE_STATUSES.review.key:
                    return SALE_STATUSES.review[key];
                case SALE_STATUSES.canceled.key:
                    return SALE_STATUSES.canceled[key];
                case SALE_STATUSES.successful.key:
                    return SALE_STATUSES.successful[key];
            }
        },
    },
};
</script>

<style lang="sass" scoped>
.profile-sale
    display: flex
    flex-direction: column
    margin-top: 0.8rem
    padding: 2.4rem 3.2rem 9.8rem 3.2rem
    background-color: $color-white
    border-radius: 2rem 0 0 0
    width: 100%
    flex: 1 1 auto

.header
    display: flex
    align-items: center
    justify-content: space-between
    gap: 1.6rem
    margin-bottom: 3.2rem
    .title
        font-weight: 600
        font-size: 3.2rem
        line-height: 3.2rem

.table-tabs
    margin-bottom: 0.8rem

.table
    &:deep(.tbody-item)
        vertical-align: top
    .status
        display: flex
        align-items: center
        gap: 0.6rem
        &-icon
            width: 1.6rem
            height: 1.6rem
            &.active
                fill: $color-violet-100
            &.review
                fill: $color-yellow-dark
            &.canceled
                fill: $color-red-dark
            &.successful
                fill: $color-green

.pagination
    position: fixed
    bottom: 3.8rem
    right: 0
    width: calc( 100% - 22rem )
    z-index: 50
</style>