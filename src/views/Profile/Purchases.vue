<template lang="pug">
    profile-wrapper.purchases(
        :title="$lang.purchase"
        :pagination="pagination"
        :items="purchases"
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
                    @apply="exportPurchases"
                )

        template(#content)
            v-tabs.table-tabs(
                v-model="activeTab"
                :tabs="tableTabs"
                @select="toggleTable"
            )
            v-table.table-purchases(
                :headers="tableHeaders"
                :items="purchases"
                :isLoading="isLoading"
                @search="search"
            )
                template(#paymentSystem="{ item }")
                    .payment {{ setPaymentSystem(item.paymentSystem) }}
                template(#requisites="{ item }")
                    .requisites
                        .value {{ item.requisites }}
                        .bank {{ setBankType(item.bankType) }}
                template(#amount="{ item }")
                    .amount {{ getCurrencyValue(item.amount) }}
                template(#status="{ item }")
                    .status(:class="setStatus(item.status, 'color')")
                        inline-svg.status-icon(:src="setStatus(item.status, 'icon')")
                        .status-text {{ setStatus(item.status, 'transactionTitle') }}
                template(#dateCreate="{ item }")
                    table-date(
                        v-if="item.dateCreate"
                        :date="item.dateCreate"
                    )
                template(#thead)
                    .thead-item
                template(#tbody="{ item }")
                    purchases-controls(:item="item")
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
import PopupRange from '@/components/Popup/PopupRange.vue';
import VTable from '@/components/common/VTable.vue';
import VTabs from '@/components/common/VTabs.vue';
import TableDate from '@/components/common/Table/TableDate.vue';
import EmptyForm from '@/components/Profile/EmptyForm.vue';
import PurchasesControls from '@/components/Profile/Purchases/PurchasesControls.vue';

import { PURCHASES } from '@/helpers/table';
import { downloadFile } from '@/helpers/url';
import { getCurrencyValue } from '@/helpers/string';
import { PURCHASES_STATUSES } from '@/helpers/catalogs';
import { PAYMENT_SYSTEMS } from '@/helpers/constants';
import { BANKS } from '@/helpers/testData';

export default {
    name: 'ProfilePurchases',

    components: {
        ProfileWrapper,
        VButton,
        PopupRange,
        VTable,
        TableDate,
        VTabs,
        EmptyForm,
        PurchasesControls,
    },

    data() {
        return {
            tableHeaders: PURCHASES,
            isOpenExport: false,
            isLoading: false,
            urlParams: Object.assign({}, this.$route.query),
            tableTabs: [
                { key: 'all', title: this.$lang.allPayments },
                ...Object.values(PURCHASES_STATUSES),
            ],
            activeTab: 'all',
            search: debounce(this.searchTable, 500),
            getCurrencyValue: getCurrencyValue,
        };
    },

    computed: {
        ...mapState({
            purchases: ({ purchases }) => purchases.purchases,
            pagination: ({ purchases }) => purchases.pagination,
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
                        subtitle: this.$lang.emptyPurchasesSubtitle.all,
                    };
                case PURCHASES_STATUSES.available.key:
                    baseForm.subtitle = this.$lang.emptyPurchasesSubtitle.available;
                    return baseForm;
                case PURCHASES_STATUSES.active.key:
                    baseForm.subtitle = this.$lang.emptyPurchasesSubtitle.active;
                    return baseForm;
                case PURCHASES_STATUSES.cancelled.key:
                    baseForm.subtitle = this.$lang.emptyPurchasesSubtitle.cancelled;
                    return baseForm;
                case PURCHASES_STATUSES.successful.key:
                    baseForm.subtitle = this.$lang.emptyPurchasesSubtitle.successful;
                    return baseForm;
            }
        },
    },

    methods: {
        async getPurchases() {
            this.isLoading = true;

            try {
                await this.$store.dispatch('purchases/getPurchases', this.urlParams);
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

        async exportPurchases(date) {
            const params = {
                dateStart: date.start,
                dateEnd: date.end,
            };

            try {
                const { data: blob } = await this.$api.purchases.exportPurchases(params);
                downloadFile(blob, 'purchases.xlsx');
            } catch (error) {
                console.log(error);
            }
        },

        searchTable(value, key) {
            this.urlParams[key] = value;
            this.$router.push({ query: this.urlParams });
        },

        toggleTable() {
            if (this.activeTab === 'all') {
                delete this.urlParams.status;
            } else {
                const status = PURCHASES_STATUSES[this.activeTab];
                this.urlParams.status = status.id;
            }

            this.$router.push({ query: this.urlParams });
        },

        setStatus(status, key) {
            const statusItem = Object.values(PURCHASES_STATUSES).find(item => item.id === status);
            return statusItem[key] || '';
        },

        setPaymentSystem(id) {
            const paymentSystem = Object.values(PAYMENT_SYSTEMS).find(item => item.id === id);
            return paymentSystem?.title || '';
        },

        setBankType(id) {
            return BANKS.find(bank => bank.id === id)?.title;
        },
    },

    watch: {
        '$route.query': {
            handler(query) {
                this.urlParams = Object.assign({}, query);
                this.getPurchases();
            },
            deep: true,
        },
    },

    async created() {
        await this.getPurchases();
    },
};
</script>

<style lang="sass" scoped>
$col-size-1: minmax(13.41%, 1fr)
$col-size-2: minmax(15.57%, 1fr)
$col-size-3: minmax(22.15%, 1fr)
$col-size-4: minmax(8.65%, 1fr)

.purchases
    &:deep(.header)
        justify-content: space-between

.export
    position: relative

.table-tabs
    margin-bottom: 0.8rem

.table-purchases
    &:deep(.table-item-status)
        padding: 0.3rem
    &:deep(.table)
        grid-template-columns: $col-size-1 $col-size-2 $col-size-3 repeat(3, $col-size-1) $col-size-4

.status
    display: flex
    align-items: flex-start
    gap: 0.6rem
    border-radius: 0.6rem
    padding: 0.6rem 0.9rem
    height: 100%
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

.table-tabs
    &:deep(.tab)
        &.red .icon
            transform: rotate(-90deg)
</style>