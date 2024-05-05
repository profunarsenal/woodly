<template lang="pug">
    .profile-sale
        .header
            .title Продажа
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
                .amount {{ getCurrencyValue(item.amount) }}
            template(#status="{ item }")
                .status
                    inline-svg.status-icon(
                        :src="setStatus(item.status, 'icon')"
                        :class="setStatus(item.status, 'color')"
                    )
                    .status-text {{ setStatus(item.status, 'transactionTitle') }}
            template(#dateCreate="{ item }")
                .date(v-if="item.dateCreate") {{ formatTableDate(item.dateCreate).date }} ·
                    |
                    span.time {{ formatTableDate(item.dateCreate).time }}
            template(#dateClose="{ item }")
                .date(v-if="item.dateClose") {{ formatTableDate(item.dateClose).date }} ·
                    |
                    span.time {{ formatTableDate(item.dateClose).time }}
            template(#thead)
                th.thead-item(colspan="2")
            template(#tbody="{ item }")
                table-controls(:item="item")
            template(#empty)
                empty-form(
                    :imageSrc="emptyForm.src"
                    :title="emptyForm.title"
                    :subtitle="emptyForm.subtitle"
                )
    app-pagination.pagination(
        v-if="pagination.pages > 1"
        :pages="pagination.pages"
        :limit="pagination.limit"
        :total="pagination.total"
        :count="transactions.length"
    )
</template>

<script>
import { mapState } from 'vuex';
import debounce from 'lodash/debounce';
import AppPagination from '@/components/app/AppPagination.vue';
import VButton from '@/components/common/VButton.vue';
import VTabs from '@/components/common/VTabs.vue';
import VTable from '@/components/common/VTable.vue';
import VLoader from '@//components/common/VLoader.vue';
import EmptyForm from '@/components/app/EmptyForm.vue';
import TableControls from '@/components/Profile/Sale/TableControls.vue';
import ExportWindow from '@/components/Profile/ExportWindow.vue';
import { TRANSACTIONS_STATUSES } from '@/helpers/catalogs';
import { TRANSACTIONS_TABLE_HEADERS } from '@/helpers/table';
import { formatDate, formatTime, getCurrencyValue } from '@/helpers/string';
import { exportTransactions } from '@/helpers/url';

export default {
    name: 'ProfileSale',

    components: {
        AppPagination,
        VButton,
        VTabs,
        VTable,
        VLoader,
        EmptyForm,
        TableControls,
        ExportWindow,
    },

    data() {
        return {
            tableHeaders: TRANSACTIONS_TABLE_HEADERS,
            tableTabs: [
                { key: 'all', title: 'Все сделки' },
                ...Object.values(TRANSACTIONS_STATUSES),
            ],
            activeTab: 'all',
            urlParams: Object.assign({}, this.$route.query),
            isLoading: false,
            isOpenExport: false,
            search: debounce(this.searchTable, 500),
            getCurrencyValue: getCurrencyValue,
        };
    },

    computed: {
        ...mapState({
            transactions: ({ transactions }) => transactions.transactions,
            pagination: ({ transactions }) => transactions.pagination,
        }),

        emptyForm() {
            const baseForm = {
                src: '/images/empty/search.png',
                title: 'Ничего не нашлось',
            };

            if (this.activeTab === 'all') {
                return {
                    src: '/images/empty/wallet.png',
                    title: 'У вас еще нет сделок',
                    subtitle: 'Здесь будут храниться все сделки по продаже',
                };
            }

            if (this.activeTab === TRANSACTIONS_STATUSES.active.key) {
                baseForm.subtitle = 'Здесь будут храниться все активные сделки';
            }

            if (this.activeTab === TRANSACTIONS_STATUSES.review.key) {
                baseForm.subtitle = 'Здесь будут храниться все сделки на проверке';
            }

            if (this.activeTab === TRANSACTIONS_STATUSES.canceled.key) {
                baseForm.subtitle = 'Здесь будут храниться все отмененные сделки';
            }

            if (this.activeTab === TRANSACTIONS_STATUSES.successful.key) {
                baseForm.subtitle = 'Здесь будут храниться все успешные сделки';
            }

            return baseForm;
        },
    },

    methods: {
        async getTransactions() {
            this.isLoading = true;

            try {
                await this.$store.dispatch('transactions/getTransactions', this.urlParams);
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
                const status = TRANSACTIONS_STATUSES[this.activeTab];
                this.urlParams.status = status.id;
            }

            this.$router.push({ query: this.urlParams });
        },

        searchTable(value, key) {
            this.urlParams[key] = value;
            this.$router.push({ query: this.urlParams });
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

.pagination
    position: fixed
    bottom: 3.8rem
    right: 0
    width: calc( 100% - 22rem )
    z-index: 50
</style>