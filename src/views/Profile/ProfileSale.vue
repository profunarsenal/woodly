<template lang="pug">
    .profile-sale
        .header
            .title Продажа
            .export
                v-button(
                    type="outline"
                    iconSrc="/icons/download.svg"
                    size="small"
                ) Экспорт
                .export-window
                    .pickers
                        v-date-picker
                        v-date-picker
                    .buttons
                        v-button(
                            type="secondary"
                        ) Сбросить
                        v-button(isDisabled) Выгрузить
        v-tabs.table-tabs(
            v-model="activeTab"
            :tabs="tableTabs"
            @select="toggleTable"
        )
        .loader(v-if="isLoading")
            v-loader(size="big")
        v-table.transactions-table(
            v-else
            :headers="tableHeaders"
            :items="transactions"
            @search="search"
        )
            template(#cardNumberAndTitle="{ item }")
                .card-number {{ item.cardNumber }}
                .card-name {{ item.title }}
            template(#amount="{ item }")
                .amount {{ `${item.amount}₽` }}
            template(#status="{ item }")
                .status
                    inline-svg.status-icon(
                        :src="setStatus(item.status, 'icon')"
                        :class="setStatus(item.status, 'color')"
                    )
                    .status-text {{ setStatus(item.status, 'transactionTitle') }}
            template(#dateCreate="{ item }")
                .date(v-if="item.dateCreate") {{ formatDate(item.dateCreate).date }} ·
                    |
                    span.time {{ formatDate(item.dateCreate).time }}
            template(#dateClose="{ item }")
                .date(v-if="item.dateClose") {{ formatDate(item.dateClose).date }} ·
                    |
                    span.time {{ formatDate(item.dateClose).time }}
            template(#thead)
                th.thead-item(colspan="2")
            template(#tbody="{ item }")
                template(v-if="item.status === transactionsStatuses.successful.id")
                    td.tbody-item(colspan="2")
                template(v-else-if="item.status === transactionsStatuses.review.id")
                    td.tbody-item
                        .table-buttons
                            .table-button
                                button-mini(type="confirm")
                                v-tooltip.table-tooltip(
                                    position="right"
                                    text="Подтвердить сделку"
                                )
                                //- window-confirm
                            button-mini(type="decline")
                    td.tbody-item
                        button-mini(type="option")
                template(v-else)
                    td.tbody-item
                        button-mini(type="confirm")
                    td.tbody-item
                        button-mini(type="edit")
    app-pagination.pagination
</template>

<script>
import debounce from 'lodash/debounce';
import AppPagination from '@/components/app/AppPagination.vue';
import VButton from '@/components/common/VButton.vue';
import VTabs from '@/components/common/VTabs.vue';
import VTable from '@/components/common/VTable.vue';
import VTooltip from '@/components/common/VTooltip.vue';
import VLoader from '@//components/common/VLoader.vue';
import VDatePicker from '@/components/common/VDatePicker.vue';
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import WindowConfirm from '@/components/app/WindowConfirm.vue';
import { TRANSACTIONS_STATUSES } from '@/helpers/catalogs';
import { TRANSACTIONS_TABLE_HEADERS } from '@/helpers/table';
import { formatDate, formatTime } from '@/helpers/string';

export default {
    name: 'ProfileSale',

    components: {
        AppPagination,
        VButton,
        VTabs,
        VTable,
        VLoader,
        VTooltip,
        VDatePicker,
        ButtonMini,
        WindowConfirm,
    },

    data() {
        return {
            tableHeaders: TRANSACTIONS_TABLE_HEADERS,
            tableTabs: [
                { key: 'all', title: 'Все сделки' },
                ...Object.values(TRANSACTIONS_STATUSES),
            ],
            transactionsStatuses: TRANSACTIONS_STATUSES,
            activeTab: 'all',
            transactions: [],
            urlParams: Object.assign({}, this.$route.query),
            isLoading: false,
            search: debounce(this.searchTable, 500),
        };
    },

    methods: {
        async getTransactions() {
            this.isLoading = true;

            try {
                const { data } = await this.$api.transactions.getTransactions(this.urlParams);
                this.transactions = data.transactions;
            } catch (error) {
                console.log(error)
            } finally {
                this.isLoading = false;
            }
        },

        setStatus(status, key) {
            const statusItem = Object.values(TRANSACTIONS_STATUSES).find(item => item.id === status);
            return statusItem[key] || '';
        },

        formatDate(date) {
            return {
                date: formatDate(date),
                time: formatTime(date),
            };
        },

        toggleTable() {
            if (this.activeTab === 'all') {
                delete this.urlParams.status;
            } else {
                const status = this.transactionsStatuses[this.activeTab];
                this.urlParams.status = status.id;
            }

            this.$router.push({ query: this.urlParams });
        },

        searchTable(value, key) {
            this.urlParams[key] = value;
            this.$router.push({ query: this.urlParams });
        },
    },

    watch: {
        '$route.query': {
            handler(query) {
                this.urlParams = Object.assign({}, query);
                this.getTransactions();
            },
            deep: true,
        },
    },

    created() {
        this.getTransactions();
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
    .export
        position: relative
        &-window
            position: absolute
            z-index: 99
            top: calc( 100% + 0.8rem )
            right: 0
            min-width: 61.8rem
            padding: 1.2rem 1.6rem
            border-radius: 2rem
            background-color: $color-white
            border: 0.1rem solid $color-gray-100
            display: flex
            flex-direction: column
            gap: 2.4rem
            .pickers,
            .buttons
                display: flex
                align-items: center
                gap: 1.2rem
                &:deep(.button)
                    flex: 1

.loader
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    fill: $color-violet-100

.table-tabs
    margin-bottom: 0.8rem

.transactions-table
    .tbody-item
        padding: 1.6rem 1.2rem
    &:deep(.tbody-item)
        vertical-align: top
    .status
        display: flex
        align-items: center
        gap: 0.6rem
        &-icon
            width: 1.6rem
            height: 1.6rem
            fill: $color-violet-100
            &.yellow
                fill: $color-yellow-dark
            &.red
                fill: $color-red-dark
            &.green
                fill: $color-green
    .time
        color: $color-gray-dark
    .table-buttons
        display: flex
        gap: 0.8rem
    .table-button
        width: 2rem
        height: 2rem
        position: relative
        @media(any-hover:hover)
            &:hover
                .table-tooltip
                    opacity: 1
                    visibility: visible
                    pointer-events: all
                    transition: 0.4s ease 0.4s
    .table-tooltip
        opacity: 0
        visibility: hidden
        pointer-events: none
        right: calc( 100% + 0.8rem )
        top: -0.3rem
        transition: 0.2s ease

.pagination
    position: fixed
    bottom: 3.8rem
    right: 0
    width: calc( 100% - 22rem )
    z-index: 50
</style>