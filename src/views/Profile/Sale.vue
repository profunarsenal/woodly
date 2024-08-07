<template lang="pug">
    profile-wrapper.sale(
        :title="$lang.sale"
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
                ) {{ $lang.export }}
                popup-range(
                    v-if="isOpenExport"
                    v-click-outside="closeExport"
                    isDate
                    :applyButton="$lang.unload"
                    @apply="exportTransactions"
                )

        template(#content)
            v-tabs.table-tabs(
                v-model="activeTab"
                :tabs="tableTabs"
                @select="toggleTable"
            )
            v-table.table-transactions(
                :headers="tableHeaders"
                :items="transactions"
                :isLoading="isLoading"
                @search="search"
            )
                template(#cardNumberAndTitle="{ item }")
                    .card-number {{ item.card.cardNumber }}
                    .card-name {{ item.card.title }}
                template(#amount="{ item }")
                    .amount {{ getCurrencyValue(item.amount) }}
                template(#status="{ item }")
                    .status(:class="setStatus(item.status, 'key')")
                        inline-svg.icon(:src="setStatus(item.status, 'icon')")
                        .text {{ setStatus(item.status, 'transactionTitle') }}
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
                    .thead-item(colspan="2")
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
import EmptyForm from '@/components/Profile/EmptyForm.vue';
import SaleControls from '@/components/Profile/Sale/SaleControls.vue';
import PopupRange from '@/components/Popup/PopupRange.vue';
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
        PopupRange,
        TableDate,
    },

    data() {
        return {
            tableHeaders: TRANSACTIONS_TABLE_HEADERS,
            tableTabs: [
                { key: 'all', title: this.$lang.allDeals },
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
                title: this.$lang.nothingFound,
            };

            switch (this.activeTab) {
                case 'all':
                    return {
                        src: '/images/empty/wallet.png',
                        title: this.$lang.youHaveNoDeals,
                        subtitle: this.$lang.emptySaleSubtitle.all,
                    };
                case TRANSACTIONS_STATUSES.active.key:
                    baseForm.subtitle = this.$lang.emptySaleSubtitle.active;
                    return baseForm;
                case TRANSACTIONS_STATUSES.review.key:
                    baseForm.subtitle = this.$lang.emptySaleSubtitle.review;
                    return baseForm;
                case TRANSACTIONS_STATUSES.cancelled.key:
                    baseForm.subtitle = this.$lang.emptySaleSubtitle.cancelled;
                    return baseForm;
                case TRANSACTIONS_STATUSES.successful.key:
                    baseForm.subtitle = this.$lang.emptySaleSubtitle.successful;
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
            const KEYS_FOR_SEARCH = {
                cardNumberAndTitle: 'cardNumberAndTitle',
                cardNumber: 'cardNumber',
                title: 'title',
            };

            if (key === KEYS_FOR_SEARCH.cardNumberAndTitle) {
                if (Number.isFinite(+value)) {
                    this.urlParams[KEYS_FOR_SEARCH.cardNumber] = value;
                    this.urlParams[KEYS_FOR_SEARCH.title] = '';
                } else {
                    this.urlParams[KEYS_FOR_SEARCH.title] = value;
                    this.urlParams[KEYS_FOR_SEARCH.cardNumber] = '';
                }
                this.$router.push({ query: this.urlParams });
                return;
            }

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
            const params = {
                dateStart: date.start,
                dateEnd: date.end,
            };

            try {
                const { data: blob } = await this.$api.transactions.exportTransactions(params);
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
$col-size-1: minmax(12.11%, 1fr)
$col-size-2: minmax(22.15%, 1fr)
$col-size-3: minmax(14.99%, 1fr)
$col-size-4: minmax(10.73%, 1fr)
$col-size-5: minmax(10.03%, 1fr)

.sale
    &:deep(.header)
        justify-content: space-between

.export
    position: relative

.table-tabs
    margin-bottom: 0.8rem

.table-transactions
    &:deep(.table-item-status)
        padding: 0.3rem
    &:deep(.table)
        grid-template-columns: $col-size-1 $col-size-2 $col-size-3 $col-size-4 repeat(2, $col-size-3) $col-size-5
    .status
        display: flex
        align-items: flex-start
        gap: 0.6rem
        border-radius: 0.6rem
        padding: 0.6rem 0.9rem
        height: 100%
        .icon
            width: 1.6rem
            height: 1.6rem
        &.active
            background-color: rgba($color-violet-100, 0.08)
            .icon
                fill: $color-violet-100
        &.review
            background-color: rgba($color-yellow-dark, 0.08)
            .icon
                fill: $color-yellow-dark
        &.cancelled
            background-color: rgba($color-red-dark, 0.08)
            .icon
                fill: $color-red-dark
        &.successful
            background-color: rgba($color-green, 0.08)
            .icon
                fill: $color-green
</style>