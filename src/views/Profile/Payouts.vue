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
                    v-search(v-model="searchField")

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

import { PAYOUTS_STATUSES } from '@/helpers/catalogs';
import { PAYOUTS } from '@/helpers/table';

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
        };
    },

    computed: {
        ...mapState({
            payouts: ({ purchases }) => purchases.purchases,
            pagination: ({ purchases }) => purchases.pagination,
        }),
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

        openModalCreatePayout() {},
        openModalExport() {},
        openCurrencies() {},
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
