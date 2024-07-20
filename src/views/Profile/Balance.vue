<template lang="pug">
    profile-wrapper.balance(
        :title="$lang.balance"
        :pagination="pagination"
        :items="balanceTransactions"
        :isLoading="isLoading"
    )
        template(#header)
            .id {{ $lang.myId }} {{ user.userId }}
        template(#content)
            .currencies
                currency-block(
                    v-for="balance in balances"
                    :key="balance.address"
                    :balance="balance"
                    imageSrc="/icons/currencies/rouble.svg"
                )
            .table-header
                v-tabs.table-tabs(
                    v-model="activeTab"
                    :tabs="tableTabs"
                    @select="toggleTable"
                )
                .export
                    v-button(
                        type="outline"
                        iconSrc="/icons/download.svg"
                        size="small"
                        @click="openExport"
                    ) {{ $lang.export }}
                    range-window(
                        v-if="isOpenExport"
                        v-click-outside="closeExport"
                        isDate
                        :applyButton="$lang.unload"
                        @apply="exportBalance"
                    )
            v-table.table(
                :headers="tableHeaders"
                :items="balanceTransactions"
                :isLoading="isLoadingTransactions"
                :isActiveFilters="isActiveFilters"
                @search="search"
            )
                template(#status="{ item }")
                    .status(:class="getStatus(item.status).key")
                        inline-svg.status-icon(:src="getStatus(item.status).icon")
                        .status-text {{ getStatus(item.status).transactionTitle }}
                template(#amount="{ item }")
                    .bank {{ getCurrencyValue(item.amount) }}
                template(#date="{ item }")
                    table-date(
                        v-if="item.date"
                        :date="item.date"
                    )
                template(#filter-date="{ item }")
                    range-window(
                        isDate
                        :value="[filters.dateStart, filters.dateEnd]"
                        :applyButton="$lang.applyFilter"
                        @apply="prepareFilterByDate"
                    )
                template(#filter-amount="{ item }")
                    range-window(
                        :labels="[$lang.amountFrom, $lang.amountUpTo]"
                        :placeholders="[$lang.enterAmount, $lang.enterAmount]"
                        :applyButton="$lang.applyFilter"
                        :value="[filters.amountStart, filters.amountEnd]"
                        @apply="prepareFilterByAmount"
                    )
</template>

<script>
import { mapState, mapGetters } from 'vuex';
import debounce from 'lodash/debounce';

import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import CurrencyBlock from '@/components/Profile/Balance/CurrencyBlock.vue';
import VTable from '@/components/common/VTable.vue';
import AppPagination from '@/components/app/AppPagination.vue';
import VTabs from '@/components/common/VTabs.vue';
import VButton from '@/components/common/VButton.vue';
import RangeWindow from '@/components/app/RangeWindow.vue';
import TableDate from '@/components/common/Table/TableDate.vue';

import { BALANCE_TRANSACTIONS } from '@/helpers/table';
import { BALANCE_STATUSES } from '@/helpers/catalogs';
import { getCurrencyValue } from '@/helpers/string';
import { downloadFile } from '@/helpers/url';

export default {
    name: 'ProfileBalance',

    components: {
        ProfileWrapper,
        CurrencyBlock,
        VTable,
        AppPagination,
        VTabs,
        VButton,
        RangeWindow,
        TableDate,
    },

    data() {
        return {
            isLoading: false,
            isLoadingTransactions: false,
            isOpenExport: false,
            isActiveFilters: false,
            filters: {
                dateStart: '',
                dateEnd: '',
            },
            urlParams: Object.assign({}, this.$route.query),
            tableHeaders: BALANCE_TRANSACTIONS,
            getCurrencyValue: getCurrencyValue,
            activeTab: 'all',
            search: debounce(this.searchOnTable, 500),
        };
    },

    computed: {
        ...mapState({
            user: ({ auth }) => auth.user,
            balances: ({ balance }) => balance.balances,
            balanceTransactions: ({ balance }) => balance.balanceTransactions,
            pagination: ({ balance }) => balance.pagination,
        }),

        ...mapGetters({
            role: 'auth/role',
        }),

        tableTabs() {
            return [
                { key: 'all', title: this.$lang.allTransactions },
                ...BALANCE_STATUSES[this.role],
            ];
        },
    },

    methods: {
        toggleTable() {
            if (this.activeTab === 'all') {
                delete this.urlParams.status;
            } else {
                const status = this.tableTabs.find(tab => tab.key === this.activeTab);
                this.urlParams.status = status.id;
            }

            this.$router.push({ query: this.urlParams });
        },

        getStatus(status) {
            return this.tableTabs.find(item => item.id === status);
        },

        async getBalanceTransactions() {
            try {
                this.isLoadingTransactions = true;
                await this.$store.dispatch('balance/getBalanceTransactions', this.urlParams);
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoadingTransactions = false;
            }
        },

        async getBalance() {
            try {
                this.isLoading = true;
                await this.$store.dispatch('balance/getBalance');
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },

        openExport() {
            this.isOpenExport = true;
        },

        closeExport() {
            this.isOpenExport = false;
        },

        async exportBalance(date) {
            try {
                const { data: blob } = await this.$api.balance.exportBalance(date);
                downloadFile(blob, 'balance.xlsx');
            } catch (error) {
                console.log(error);
            }
        },

        searchOnTable(value, key) {
            this.urlParams[key] = value;
            this.$router.push({ query: this.urlParams });
        },

        prepareFilterByDate(values) {
            const filters = {
                dateStart: values.start,
                dateEnd: values.end,
            };

            this.filterOnTable(filters);
        },

        prepareFilterByAmount(values) {
            const filters = {
                amountStart: values.start,
                amountEnd: values.end,
            };

            this.filterOnTable(filters);
        },

        filterOnTable(filters) {
            this.isActiveFilters = true;

            for(const key in filters) {
                this.urlParams[key] = filters[key];
                this.filters[key] = filters[key];
            }

            this.$router.push({ query: this.urlParams });
        },

        initFilters() {
            Object.keys(this.filters).forEach((key) => {
                if (this.$route.query[key]) {
                    this.filters[key] = this.$route.query[key];
                    this.isActiveFilters = true;
                }
            });
        },
    },

    watch: {
        '$route.query': {
            handler(query) {
                this.urlParams = Object.assign({}, query);
                this.getBalanceTransactions();
            },
            deep: true,
        },
    },

    async created() {
        await Promise.allSettled([
            this.getBalance(),
            this.getBalanceTransactions(),
        ]);

        this.initFilters();
    },
};
</script>

<style lang="sass" scoped>
.balance
    &:deep(.header)
        justify-content: space-between

.loader
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    fill: $color-violet-100

.currencies
    margin-bottom: 4rem

.id
    font-weight: 600
    font-size: 3.2rem
    line-height: 3.2rem
    color: $color-silver-light

.table-header
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 0.8rem
    .export
        position: relative

.status
    display: flex
    align-items: center
    gap: 0.6rem
    border-radius: 0.6rem
    padding: 0.6rem 0.9rem
    &-icon
        width: 1.6rem
        height: 1.6rem
    &.internal
        background-color: rgba($color-violet-100, 0.1)
        .status-icon
            fill: $color-violet-100
    &.freeze,
    &.depositTraders
        background-color: rgba($color-yellow-dark, 0.1)
        .status-icon
            fill: $color-yellow-dark
    &.deduction,
    &.transaction,
    &.sent
        background-color: rgba($color-red-dark, 0.08)
        .status-icon
            fill: $color-red-dark
    &.deposit,
    &.purchase,
    &.transactionAdmin
        background-color: rgba($color-green, 0.08)
        .status-icon
            fill: $color-green
    &.transactionAdmin,
    &.purchase,
    &.deposit
        .status-icon
            transform: rotate(90deg)
    &.sent,
    &.transaction,
    &.deduction
        .status-icon
            transform: rotate(-90deg)

.table-tabs
    &:deep(.tab)
        &.deposit,
        &.purchase,
        &.transactionAdmin
            .icon
                transform: rotate(90deg)
        &.deduction,
        &.transaction,
        &.sent
            .icon
                transform: rotate(-90deg)

.table
    &:deep(.table-item-status)
        padding: 0.3rem
    .content
        display: flex
        align-items: center
        .title
            font-weight: 500
            font-size: 1.4rem
            line-height: 2rem
</style>