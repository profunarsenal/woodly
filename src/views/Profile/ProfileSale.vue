<template lang="pug">
    profile-wrapper.sale(
        title="Продажа"
        :pagination="pagination"
        :items="transactions"
    )
        template(#header)
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
                    @unload="exportTransactions"
                )

        template(#content)
            v-tabs.table-tabs(
                v-model="activeTab"
                :tabs="tableTabs"
                @select="toggleTable"
            )
            v-table.transactions-table(
                :headers="tableHeaders"
                :items="transactions"
                :isLoading="isLoading"
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
                    table-date(
                        v-if="item.dateCreate"
                        :date="item.dateCreate"
                    )
                template(#dateClose="{ item }")
                    table-date(
                        v-if="item.dateClose"
                        :date="item.dateClose"
                    )
                template(#thead)
                    th.thead-item(colspan="2")
                template(#tbody="{ item }")
                    sale-controls(:item="item")
                template(#empty)
                    empty-form(
                        :imageSrc="emptyForm.src"
                        :title="emptyForm.title"
                        :subtitle="emptyForm.subtitle"
                    )
</template>

<script>
import { mapState } from 'vuex';
import debounce from 'lodash/debounce';
import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import VButton from '@/components/common/VButton.vue';
import VTabs from '@/components/common/VTabs.vue';
import VTable from '@/components/common/VTable.vue';
import EmptyForm from '@/components/app/EmptyForm.vue';
import SaleControls from '@/components/Profile/Sale/SaleControls.vue';
import ExportWindow from '@/components/Profile/ExportWindow.vue';
import TableDate from '@/components/common/Table/TableDate.vue';
import { TRANSACTIONS_STATUSES } from '@/helpers/catalogs';
import { TRANSACTIONS_TABLE_HEADERS } from '@/helpers/table';
import { getCurrencyValue } from '@/helpers/string';
import { downloadFile } from '@/helpers/url';

export default {
    name: 'ProfileSale',

    components: {
        ProfileWrapper,
        VButton,
        VTabs,
        VTable,
        EmptyForm,
        SaleControls,
        ExportWindow,
        TableDate,
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

            switch (this.activeTab) {
                case 'all':
                    return {
                        src: '/images/empty/wallet.png',
                        title: 'У вас еще нет сделок',
                        subtitle: 'Здесь будут храниться все сделки по продаже',
                    };
                case TRANSACTIONS_STATUSES.active.key:
                    baseForm.subtitle = 'Здесь будут храниться все активные сделки';
                    return baseForm;
                case TRANSACTIONS_STATUSES.review.key:
                    baseForm.subtitle = 'Здесь будут храниться все сделки на проверке';
                    return baseForm;
                case TRANSACTIONS_STATUSES.canceled.key:
                    baseForm.subtitle = 'Здесь будут храниться все отмененные сделки ';
                    return baseForm;
                case TRANSACTIONS_STATUSES.successful.key:
                    baseForm.subtitle = 'Здесь будут храниться все успешные сделки';
                    return baseForm;
            }
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

        async exportTransactions(date) {
            try {
                const { data: blob } = await this.$api.transactions.exportTransactions(date);
                downloadFile(blob, 'transactions.xlsx');
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
.sale
    &:deep(.header)
        justify-content: space-between

.export
    position: relative

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
</style>