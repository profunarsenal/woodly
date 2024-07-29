<template lang="pug">
    profile-wrapper(
        :title="$lang.payments"
        :pagination="pagination"
        :items="payments"
    )
        template(#header)
            .header-controls
                v-button(
                    :isDisabled="isLoadingPage"
                    type="outline"
                    iconSrc="/icons/plus.svg"
                    @click="openModalCreatePayment"
                ) {{ $lang.createPayment }}

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
                                        v-model="filters.transactionId"
                                        :label="$lang.numberDeal"
                                        :placeholder="$lang.enterNumberDeal"
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
                                        v-model="filters.cashbox"
                                        :list="listsForFilters.cashboxes"
                                        :label="$lang.cashbox"
                                    )
                                    v-input(
                                        v-model="filters.clientNumber"
                                        :label="$lang.client"
                                        :placeholder="$lang.enterClientNumber"
                                    )
                                    v-date-picker(
                                        v-model="filters.dateEnd"
                                        :label="$lang.dateTo"
                                        needFormatDate
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
                        :isDisabled="isLoadingPage"
                        type="outline"
                        iconSrc="/icons/download.svg"
                        @click="openModalExport"
                    ) {{ $lang.export }}

        template(#content)
            v-table.table-payments(
                :headers="tableHeaders"
                :items="payments"
                :isLoading="isLoading"
                :isActiveFilters="!!appliedfilters"
            )
                template(#cashbox="{ item }")
                    .cashbox {{ item.cashbox.cashboxId }}
                template(#paymentSystem="{ item }")
                    .payment {{ setPaymentSystem(item.paymentSystem) }}
                template(#status="{ item }")
                    .status(:class="setStatus(item.status, 'key')")
                        inline-svg.icon(:src="setStatus(item.status, 'icon')")
                        .text {{ setStatus(item.status, 'title') }}
                template(#dateCreate="{ item }")
                    table-date(
                        v-if="item.dateCreate"
                        :date="item.dateCreate"
                    )
                template(#amount="{ item }")
                    .amount {{ getCurrencyValue(item.amount) }}
                template(#amountMinusCommission="{ item }")
                    .amount {{ getCurrencyValue(item.amountMinusCommission) }}
                template(#thead)
                    .thead-item
                template(#tbody="{ item }")
                    .tbody-item
                        .control
                            button-mini(
                                type="info"
                            )
                            v-tooltip.tooltip(
                                position="right"
                                :text="$lang.payoutInformation"
                            )
</template>

<script>
import { mapState } from 'vuex';

import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import VButton from '@/components/common/VButton.vue';
import VTable from '@/components/common/VTable.vue';
import TableDate from '@/components/common/Table/TableDate.vue';
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import VTooltip from '@/components/common/VTooltip.vue';
import VSearch from '@/components/common/VSearch.vue';
import VInput from '@/components/common/VInput.vue';
import VDropdown from '@/components/common/VDropdown.vue';
import VDatePicker from '@/components/common/VDatePicker.vue';

import { PAYMENTS_STATUSES } from '@/helpers/catalogs';
import { PAYMENTS_TABLE_HEADERS } from '@/helpers/table';
import { PAYMENT_SYSTEMS } from '@/helpers/constants';
import { downloadFile } from '@/helpers/url';
import { getCurrencyValue } from '@/helpers/string';

const FILTERS = {
    transactionId: '',
    status: 0,
    orderNumber: '',
    clientNumber: '',
    cashbox: 0,
    dateEnd: null,
};

export default {
    name: 'ProfilePayments',

    components: {
        ProfileWrapper,
        VButton,
        VTable,
        TableDate,
        ButtonMini,
        VTooltip,
        VSearch,
        VInput,
        VDropdown,
        VDatePicker,
    },

    data() {
        return {
            tableHeaders: PAYMENTS_TABLE_HEADERS,
            isLoading: false,
            isLoadingPage: true,
            searchField: '',
            appliedfilters: 0,
            urlParams: Object.assign({}, this.$route.query),
            filters: Object.assign({}, FILTERS),
            getCurrencyValue: getCurrencyValue,
        };
    },

    computed: {
        ...mapState({
            payments: ({ transactions }) => transactions.transactions,
            pagination: ({ transactions }) => transactions.pagination,
            cashboxes: ({ cashboxes }) => cashboxes.cashboxes,
        }),

        statuses() {
            const FIRST_ELEMENT = { id: 0, title: this.$lang.all };
            const statuses = Object.values(PAYMENTS_STATUSES).map(({ id, title }) => {
                return { id, title };
            });

            return [ FIRST_ELEMENT, ...statuses];
        },

        filtersCount() {
            return Object.values(this.filters).filter(filter => filter);
        },

        listsForFilters() {
            const FIRST_ELEMENT = { id: 0, title: this.$lang.all };
            const statuses = Object.values(PAYMENTS_STATUSES).map(({ id, title }) => {
                return { id, title };
            });
            const cashboxes = this.cashboxes.map(({ cashboxId, title }) => {
                return {
                    id: cashboxId,
                    title,
                };
            });

            return {
                statuses: [ FIRST_ELEMENT, ...statuses ],
                cashboxes: [ FIRST_ELEMENT, ...cashboxes ],
            };
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

        async exportPayments(params) {
            try {
                const { data: blob } = await this.$api.transactions.exportTransactions(params);
                downloadFile(blob, 'payments.xlsx');
            } catch (error) {
                console.log(error);
            }
        },

        openModalExport() {
            this.$store.commit('modal/open', {
                component: 'ModalExport',
                positionCenter: true,
                componentData: {
                    callback: (params) => this.exportPayments(params),
                    cashboxes: this.cashboxes,
                    statuses: this.statuses,
                },
            });
        },

        openModalCreatePayment() {
            this.$store.commit('modal/open', {
                component: 'ModalCreatePayment',
                componentData: {
                    cashboxes: this.cashboxes,
                },
            });
        },

        setPaymentSystem(id) {
            const paymentSystem = Object.values(PAYMENT_SYSTEMS).find(item => item.id === id);
            return paymentSystem?.title || '';
        },

        setStatus(status, key) {
            const statusItem = Object.values(PAYMENTS_STATUSES).find(item => item.id === status);
            return statusItem[key] || '';
        },

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
                this.getTransactions();
            },
            deep: true,
        },
    },

    async created() {
        await this.getTransactions();

        if (!this.cashboxes.length) {
            await this.$store.dispatch('cashboxes/getCashboxes');
        }

        this.isLoadingPage = false;
    },
};
</script>

<style lang="sass" scoped>
$col-size-1: minmax(9.34%, 1fr)
$col-size-2: minmax(6.92%, 1fr)
$col-size-3: minmax(5.62%, 1fr)
$col-size-4: minmax(9%, 1fr)
$col-size-5: minmax(max-content, 1fr)
$col-size-6: minmax(12.46%, 1fr)
$col-size-7: minmax(11.42%, 1fr)
$col-size-8: minmax(10.38%, 1fr)
$col-size-9: minmax(11.25%, 1fr)
$col-size-10: minmax(5.28%, 1fr)

.header-controls
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
    .right-controls
        display: flex
        align-items: center
        gap: 0.8rem

.table-payments
    .tbody-item
        display: flex
        align-items: center
        justify-content: center
    &:deep(.table-item-status)
        padding: 0.3rem
    &:deep(.table)
        grid-template-columns: $col-size-1 $col-size-2 $col-size-3 repeat(2, $col-size-4) $col-size-5 $col-size-6 $col-size-7 $col-size-8 $col-size-9 $col-size-10

.status
    display: flex
    align-items: flex-start
    gap: 0.6rem
    border-radius: 0.6rem
    padding: 0.5rem 0.9rem
    height: 100%
    &-icon
        width: 1.6rem
        height: 1.6rem
    &.created,
    &.review
        background-color: rgba($color-violet-100, 0.1)
        .icon
            fill: $color-violet-100
    &.waiting
        background-color: rgba($color-yellow-dark, 0.1)
        .icon
            fill: $color-yellow-dark
    &.cancelled
        background-color: rgba($color-red-dark, 0.08)
        .icon
            fill: $color-red-dark
            transform: rotate(-90deg)
    &.completed
        background-color: rgba($color-green, 0.08)
        .icon
            fill: $color-green

.control
    width: 2rem
    height: 2rem
    position: relative
    @media(any-hover:hover)
        &:hover
            .tooltip
                opacity: 1
                visibility: visible
                pointer-events: all
                transition: 0.4s ease 0.4s

.tooltip
    opacity: 0
    visibility: hidden
    pointer-events: none
    right: calc( 100% + 0.8rem )
    top: -0.3rem
    transition: 0.2s ease

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
</style>