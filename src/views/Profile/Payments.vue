<template lang="pug">
    profile-wrapper(
        :title="$lang.payments"
        :pagination="pagination"
        :items="payments"
    )
        template(#header)
            .header-controls
                v-button(
                    type="outline"
                    iconSrc="/icons/plus.svg"
                ) {{ $lang.createPayment }}

                .right-controls
                    v-button(
                        type="outline"
                        iconSrc="/icons/download.svg"
                        @click="openModalExport"
                    ) {{ $lang.export }}

        template(#content)
            v-table(
                :headers="tableHeaders"
                :items="payments"
                :isLoading="isLoading"
            )
                template(#cashbox="{ item }")
                    .cashbox {{ item.cashbox.cashboxId }}
</template>

<script>
import { mapState } from 'vuex';

import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import VButton from '@/components/common/VButton.vue';
import VTable from '@/components/common/VTable.vue';

import { PAYMENTS_STATUSES } from '@/helpers/catalogs';
import { PAYMENTS_TABLE_HEADERS } from '@/helpers/table';

export default {
    name: 'ProfilePayments',

    components: {
        ProfileWrapper,
        VButton,
        VTable,
    },

    data() {
        return {
            tableHeaders: PAYMENTS_TABLE_HEADERS,
            isLoading: false,
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
    },
};
</script>

<style lang="sass" scoped>
.header-controls
    display: flex
    align-items: center
    justify-content: space-between
    width: 100%
</style>