<template lang="pug">
    profile-wrapper(
        :title="$lang.payouts"
        :pagination="pagination"
        :items="payouts"
    )
        template(#header)
            .header-controls
                v-button(
                    type="outline"
                    iconSrc="/icons/plus.svg"
                    @click="openModalCreatePayout"
                ) {{ $lang.createPayout }}

                .currencies
                    v-button(
                        type="outline"
                        iconSrc="/icons/chevron-dropdown.svg"
                        @click="openCurrencies"
                    ) {{ $lang.exchangeCurrencies }}

                .right-controls
                    v-search(
                        v-model="searchField"
                        :filtersCount="appliedfilters"
                        @toggleFilters="setFilters"
                    )
                        template(#filters)
                            .filters-block
                                .filters
                                    v-input(
                                        v-model="filters.purchaseId"
                                        :label="$lang.id"
                                        :placeholder="$lang.enterPaymentId"
                                    )
                                    v-dropdown(
                                        v-model="filters.status"
                                        :list="listsForFilters.statuses"
                                        :label="$lang.paymentStatus"
                                    )
                                    v-input(
                                        v-model="filters.orderNumber"
                                        :label="$lang.order"
                                        :placeholder="$lang.enterOrderNumber"
                                    )
                                    v-dropdown(
                                        v-model="filters.paymentSystem"
                                        :list="listsForFilters.paymentSystems"
                                        :label="$lang.paymentMethod"
                                    )
                                    v-input(
                                        v-model="filters.requisites"
                                        :label="$lang.recipientRequisites"
                                        :placeholder="$lang.enterRecipientRequisites"
                                    )
                                    v-dropdown(
                                        v-model="filters.cashbox"
                                        :list="listsForFilters.cashboxes"
                                        :label="$lang.cashbox"
                                    )
                                    v-dropdown(
                                        v-model="filters.bankType"
                                        :list="listsForFilters.banks"
                                        :label="$lang.bank"
                                    )
                                .filters-buttons
                                    v-button(
                                        type="secondary"
                                        size="large"
                                        :isDisabled="!filtersCount.length"
                                        @click="resetFilters"
                                    ) {{ $lang.reset }}
                                    v-button(
                                        size="large"
                                        :isDisabled="!filtersCount.length"
                                        @click="applyFilters"
                                    ) {{ $lang.apply }}

                    v-button(
                        type="outline"
                        iconSrc="/icons/download.svg"
                        @click="openModalExport"
                    ) {{ $lang.export }}

        template(#content)
            v-tabs.table-tabs(
                v-model="activeTab"
                :tabs="tableTabs"
                @select="toggleTable"
            )
            v-table.table(
                :headers="tableHeaders"
                :items="payouts"
                :isLoading="isLoading"
            )
                template(#status="{ item }")
                    .status(:class="setStatus(item.status, 'color')")
                        inline-svg.status-icon(:src="setStatus(item.status, 'icon')")
                        .status-text {{ setStatus(item.status, 'title') }}
                template(#dateCreate="{ item }")
                    table-date(
                        v-if="item.dateCreate"
                        :date="item.dateCreate"
                    )
                template(#thead)
                    th.thead-item
                        .title {{ $lang.info }}
                template(#tbody="{ item }")
                    payouts-controls(:item="item")
</template>

<script>
import { mapState } from 'vuex';

import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import VButton from '@/components/common/VButton.vue';
import VSearch from '@/components/common/VSearch.vue';
import VTabs from '@/components/common/VTabs.vue';
import VTable from '@/components/common/VTable.vue';
import TableDate from '@/components/common/Table/TableDate.vue';
import PayoutsControls from '@/components/Profile/Payouts/PayoutsControls.vue';
import VInput from '@/components/common/VInput.vue';
import VDropdown from '@/components/common/VDropdown.vue';

import { PAYOUTS_STATUSES } from '@/helpers/catalogs';
import { PAYOUTS } from '@/helpers/table';
import { downloadFile } from '@/helpers/url';
import { BANKS } from '@/helpers/testData';

const FILTERS = {
    purchaseId: '',
    status: 0,
    orderNumber: '',
    paymentSystem: 0,
    requisites: '',
    cashbox: 0,
    bankType: 0,
};

export default {
    name: 'ProfilePayments',

    components: {
        ProfileWrapper,
        VButton,
        VSearch,
        VTabs,
        VTable,
        TableDate,
        PayoutsControls,
        VInput,
        VDropdown,
    },

    data() {
        return {
            searchField: '',
            activeTab: 'all',
            tableTabs: [
                { key: 'all', title: this.$lang.allPayouts },
                ...Object.values(PAYOUTS_STATUSES),
            ],
            tableHeaders: PAYOUTS,
            isLoading: false,
            urlParams: Object.assign({}, this.$route.query),
            filters: Object.assign({}, FILTERS),
            appliedfilters: 0,
        };
    },

    computed: {
        ...mapState({
            payouts: ({ purchases }) => purchases.purchases,
            pagination: ({ purchases }) => purchases.pagination,
            cashboxes: ({ cashboxes }) => cashboxes.cashboxes,
        }),

        listsForFilters() {
            const FIRST_ELEMENT = { id: 0, title: this.$lang.all };
            const statuses = Object.values(PAYOUTS_STATUSES).map(({ id, title }) => {
                return { id, title };
            });
            const paymentSystems = [];
            const cashboxes = this.cashboxes.map(({ cashboxId, title }) => {
                return {
                    id: cashboxId,
                    title,
                };
            });

            return {
                statuses: [ FIRST_ELEMENT, ...statuses ],
                paymentSystems: [ FIRST_ELEMENT, ...paymentSystems ],
                cashboxes: [ FIRST_ELEMENT, ...cashboxes ],
                banks: [ FIRST_ELEMENT, ...BANKS ],
            };
        },

        filtersCount() {
            return Object.values(this.filters).filter(filter => filter);
        },
    },

    methods: {
        async getPayouts() {
            this.isLoading = true;

            try {
                await this.$store.dispatch('purchases/getPurchases', this.urlParams);
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },

        toggleTable() {
            if (this.activeTab === 'all') {
                delete this.urlParams.status;
            } else {
                const status = PAYOUTS_STATUSES[this.activeTab];
                this.urlParams.status = status.id;
            }

            this.$router.push({ query: this.urlParams });
        },

        setStatus(status, key) {
            const statusItem = Object.values(PAYOUTS_STATUSES).find(item => item.id === status);
            return statusItem[key] || '';
        },

        async exportPayouts(params) {
            try {
                const { data: blob } = await this.$api.purchases.exportPurchases(params);
                downloadFile(blob, 'payouts.xlsx');
            } catch (error) {
                console.log(error);
            }
        },

        openModalCreatePayout() {
            this.$store.commit('modal/open', {
                component: 'ModalCreatePayout',
                componentData: {
                    cashboxes: this.cashboxes,
                },
            });
        },

        openModalExport() {
            this.$store.commit('modal/open', {
                component: 'ModalExport',
                positionCenter: true,
                componentData: {
                    callback: (params) => this.exportPayouts(params),
                    cashboxes: this.cashboxes,
                },
            });
        },

        openCurrencies() {},

        resetFilters() {
            this.filters = Object.assign({}, FILTERS);

            for (const filter in this.filters) {
                if (this.urlParams[filter]) {
                    delete this.urlParams[filter];
                    this.appliedfilters--;
                }
            }

            this.$router.push({ query: this.urlParams });
        },

        applyFilters() {
            for (const filter in this.filters) {
                if (this.filters[filter]) {
                    this.urlParams[filter] = this.filters[filter];
                    this.appliedfilters++;
                }
            }

            this.$router.push({ query: this.urlParams });
        },

        setFilters() {
            for (const filter in this.filters) {
                if (this.urlParams[filter]) {
                    this.filters[filter] = Number.isFinite(this.filters[filter]) ?
                        +this.urlParams[filter]:
                        this.urlParams[filter];
                }
            }

            this.appliedfilters = this.filtersCount.length;
        },
    },

    watch: {
        '$route.query': {
            handler(query) {
                this.urlParams = Object.assign({}, query);
                this.getPayouts();
            },
            deep: true,
        },
    },

    async created() {
        await this.getPayouts();

        if (!this.cashboxes.length) {
            await this.$store.dispatch('cashboxes/getCashboxes');
        }
    },

    mounted() {
        this.setFilters();
    },
};
</script>

<style lang="sass" scoped>
.header-controls
    display: flex
    justify-content: space-between
    width: 100%
    gap: 1rem
    .right-controls
        display: flex
        align-items: center
        gap: 0.8rem

.table-tabs
    margin-bottom: 0.8rem

.filters-block
    position: absolute
    z-index: 50
    top: 4.4rem
    right: 0
    width: 67.2rem
    display: flex
    flex-direction: column
    gap: 2.4rem
    background-color: $color-white
    border: 0.1rem solid $color-gray-100
    border-radius: 2rem
    padding: 1.2rem 1.6rem 1.6rem 1.6rem
    .filters,
    .filters-buttons
        display: flex
        flex-wrap: wrap
        gap: 1.2rem
        > *
            flex: 0 0 calc( 50% - 0.6rem)

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

.table
    &:deep(.table-item-status)
        padding: 0.3rem
</style>
