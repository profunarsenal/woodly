<template lang="pug">
    profile-wrapper.balance(
        title="Баланс"
        :pagination="pagination"
        :items="balanceTransactions"
        :isLoading="isLoading"
    )
        template(#header)
            .id Мой ID: {{ user.userId }}
        template(#content)
            .currencies
                currency-block(
                    imageSrc="/icons/currencies/rouble.svg"
                    :balance="balance"
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
                    ) Экспорт
                    export-window(
                        v-if="isOpenExport"
                        v-click-outside="closeExport"
                        @unload="exportBalance"
                    )
            v-table.table(
                :headers="tableHeaders"
                :items="balanceTransactions"
                :isLoading="isLoadingTransactions"
            )
                template(#status="{ item }")
                    .status(:class="setStatus(item.status, 'color')")
                        inline-svg.status-icon(:src="setStatus(item.status, 'icon')")
                        .status-text {{ setStatus(item.status, 'transactionTitle') }}
                template(#amount="{ item }")
                    .bank {{ getCurrencyValue(item.amount) }}
                template(#date="{ item }")
                    table-date(
                        v-if="item.date"
                        :date="item.date"
                    )
</template>

<script>
import { mapState } from 'vuex';
import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import CurrencyBlock from '@/components/Profile/Balance/CurrencyBlock.vue';
import VTable from '@/components/common/VTable.vue';
import AppPagination from '@/components/app/AppPagination.vue';
import VTabs from '@/components/common/VTabs.vue';
import VButton from '@/components/common/VButton.vue';
import ExportWindow from '@/components/Profile/ExportWindow.vue';
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
        ExportWindow,
        TableDate,
    },

    data() {
        return {
            isLoading: false,
            isLoadingTransactions: false,
            isOpenExport: false,
            urlParams: Object.assign({}, this.$route.query),
            tableHeaders: BALANCE_TRANSACTIONS,
            getCurrencyValue: getCurrencyValue,
            activeTab: 'all',
            tableTabs: [
                { key: 'all', title: 'Все переводы' },
                ...Object.values(BALANCE_STATUSES),
            ],
        };
    },

    computed: {
        ...mapState({
            user: ({ auth }) => auth.user,
            balance: ({ balance }) => balance.balance,
            balanceTransactions: ({ balance }) => balance.balanceTransactions,
            pagination: ({ balance }) => balance.pagination,
        }),
    },

    methods: {
        toggleTable() {
            if (this.activeTab === 'all') {
                delete this.urlParams.status;
            } else {
                const status = BALANCE_STATUSES[this.activeTab];
                this.urlParams.status = status.id;
            }

            this.$router.push({ query: this.urlParams });
        },

        setStatus(status, key) {
            const statusItem = Object.values(BALANCE_STATUSES).find(item => item.id === status);
            return statusItem[key] || '';
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
    &.blue
        background-color: rgba($color-violet-100, 0.1)
        .status-icon
            fill: $color-violet-100
    &.yellow
        background-color: rgba($color-yellow-dark, 0.1)
        .status-icon
            fill: $color-yellow-dark
    &.red
        background-color: rgba($color-red-dark, 0.08)
        .status-icon
            fill: $color-red-dark
            transform: rotate(-90deg)
    &.green
        background-color: rgba($color-green, 0.08)
        .status-icon
            fill: $color-green
            transform: rotate(90deg)

.table-tabs
    &:deep(.tab)
        &.green .icon
            transform: rotate(90deg)
        &.red .icon
            transform: rotate(-90deg)

.table
    &:deep(.table-item-status)
        padding: 0.3rem
</style>