<template lang="pug">
    .profile-balance
        .header
            .title Баланс
            .id Мой ID: {{ user.userId }}
        .loader(v-if="isLoading")
            v-loader(size="big")
        template(v-else)
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
                        @unload="unloadTransactions"
                    )
            .loader(v-if="isLoadingTransactions")
                v-loader(size="big")
            v-table.table(
                v-else
                :headers="tableHeaders"
                :items="balanceTransactions"
            )
                template(#status="{ item }")
                    .status(:class="setStatus(item.status, 'color')")
                        inline-svg.status-icon(:src="setStatus(item.status, 'icon')")
                        .status-text {{ setStatus(item.status, 'transactionTitle') }}
                template(#amount="{ item }")
                    .bank {{ getCurrencyValue(item.amount) }}
                template(#date="{ item }")
                    .date(v-if="item.date") {{ formatTableDate(item.date).date }} · 
                        |
                        span.time {{ formatTableDate(item.date).time }}
    app-pagination.pagination(
        v-if="pagination.pages > 1"
        :pages="pagination.pages"
        :limit="pagination.limit"
        :total="pagination.total"
        :count="balanceTransactions.length"
    )
</template>

<script>
import { mapState } from 'vuex';
import CurrencyBlock from '@/components/Profile/Balance/CurrencyBlock.vue';
import VTable from '@/components/common/VTable.vue';
import VLoader from '@/components/common/VLoader.vue';
import AppPagination from '@/components/app/AppPagination.vue';
import VTabs from '@/components/common/VTabs.vue';
import VButton from '@/components/common/VButton.vue';
import ExportWindow from '@/components/Profile/ExportWindow.vue';
import { BALANCE_TRANSACTIONS } from '@/helpers/table';
import { BALANCE_STATUSES } from '@/helpers/catalogs';
import { getCurrencyValue, formatDate, formatTime } from '@/helpers/string';
import { exportTransactions } from '@/helpers/url';

export default {
    name: 'ProfileBalance',

    components: {
        CurrencyBlock,
        VTable,
        VLoader,
        AppPagination,
        VTabs,
        VButton,
        ExportWindow,
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
        formatTableDate(date) {
            return {
                date: formatDate(date),
                time: formatTime(date),
            };
        },

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

        openExport() {
            this.isOpenExport = true;
        },

        closeExport() {
            this.isOpenExport = false;
        },

        async unloadTransactions(date) {
            const { dateStart, dateEnd } = date;

            try {
                await exportTransactions(dateStart, dateEnd);
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
        try {
            this.isLoading = true;
            await this.$store.dispatch('balance/getBalance');
            await this.getBalanceTransactions();
        } catch (error) {
            console.log(error);
        } finally {
            this.isLoading = false;
        }
    },
};
</script>

<style lang="sass" scoped>
.profile-balance
    display: flex
    flex-direction: column
    margin-top: 0.8rem
    padding: 2.4rem 3.2rem 9.8rem 3.2rem
    background-color: $color-white
    border-radius: 2rem 0 0 0
    width: 100%
    flex: 1 1 auto

.loader
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    fill: $color-violet-100

.currencies
    margin-bottom: 4rem

.header
    display: flex
    align-items: center
    justify-content: space-between
    gap: 1.6rem
    margin-bottom: 3.2rem
    .title,
    .id
        font-weight: 600
        font-size: 3.2rem
        line-height: 3.2rem
    .id
        color: $color-silver-light

.table-header
    display: flex
    align-items: center
    justify-content: space-between
    margin-bottom: 0.8rem
    .export
        position: relative

.time
    color: $color-gray-dark

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