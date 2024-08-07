<template lang="pug">
    profile-wrapper(
        :title="$lang.cashboxes"
        :pagination="pagination"
        :items="cashboxes"
    )
        template(#header)
            v-button(
                type="outline"
                iconSrc="/icons/plus.svg"
                @click="openModalCashbox"
            ) {{ $lang.add }}

        template(#content)
            v-table.table-cashboxes(
                :headers="tableHeaders"
                :items="cashboxes"
                :isLoading="isLoading"
            )
                template(#status="{ item }")
                    .status(:class="setStatus(item.status).class")
                        inline-svg.icon(:src="setStatus(item.status).icon")
                template(#apiKey="{ item }")
                    api-control(:apiKey="item.apiKey")
                template(#balance="{ item }")
                    .balance(
                        v-for="balance in Object.entries(item.balance)"
                        :key="balance[0]"
                    )
                        .amount {{ balance[1] }}
                        .currency {{ balance[0] }}
                template(#thead)
                    .thead-item
                        .title {{ $lang.info }}
                template(#tbody="{ item }")
                    cashboxes-controls(:item="item")
</template>

<script>
import { mapState } from 'vuex';

import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import VButton from '@/components/common/VButton.vue';
import VTable from '@/components/common/VTable.vue';
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import VTooltip from '@/components/common/VTooltip.vue';
import CashboxesControls from '@/components/Profile/Cashboxes/CashboxesControls.vue';
import ApiControl from '@/components/Profile/Cashboxes/ApiControl.vue';

import { CASHBOXES } from '@/helpers/table';
import { CASHBOXES_STATUSES } from '@/helpers/catalogs';

export default {
    name: 'ProfileCashboxes',

    components: {
        ProfileWrapper,
        VButton,
        VTable,
        ButtonMini,
        VTooltip,
        CashboxesControls,
        ApiControl,
    },

    data() {
        return {
            tableHeaders: CASHBOXES,
            isLoading: false,
            urlParams: Object.assign({}, this.$route.query),
        };
    },

    computed: {
        ...mapState({
            cashboxes: ({ cashboxes }) => cashboxes.cashboxes,
            pagination: ({ cashboxes }) => cashboxes.pagination,
        }),
    },

    methods: {
        async getCashboxes() {
            this.isLoading = true;

            try {
                await this.$store.dispatch('cashboxes/getCashboxes', this.urlParams);
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },

        setStatus(status) {
            switch(status) {
                case CASHBOXES_STATUSES.active.id:
                    return {
                        class: CASHBOXES_STATUSES.active.class,
                        icon: CASHBOXES_STATUSES.active.icon,
                    };
                case CASHBOXES_STATUSES.disabled.id:
                    return {
                        class: CASHBOXES_STATUSES.disabled.class,
                        icon: CASHBOXES_STATUSES.disabled.icon,
                    };
            }
        },

        openModalCashbox() {
            this.$store.commit('modal/open', {
                component: 'ModalCashbox',
            });
        },
    },

    watch: {
        '$route.query': {
            handler(query) {
                this.urlParams = Object.assign({}, query);
                this.getCashboxes();
            },
            deep: true,
        },
    },

    async created() {
        await this.getCashboxes();
    },
};
</script>

<style lang="sass" scoped>
$col-size-1: minmax(7.61%, 1fr)
$col-size-2: minmax(19.79%, 1fr)
$col-size-3: minmax(7.01%, 1fr)
$col-size-4: minmax(6.23%, 1fr)

.table-cashboxes
    &:deep(.table-item-status)
        padding: 0.3rem
    &:deep(.table)
        grid-template-columns: $col-size-1 repeat(2, $col-size-2) $col-size-3 repeat(2, $col-size-2) $col-size-4
    .status
        display: flex
        align-items: center
        justify-content: center
        border-radius: 0.6rem
        height: 100%
        &.active
            background-color: rgba($color-green, 0.08)
            .icon
                fill: $color-green
        &.disabled
            background-color: rgba($color-red-dark, 0.08)
            .icon
                fill: $color-red-dark
        .icon
            width: 2rem
            height: 2rem
    .balance
        display: flex
        align-items: center
        gap: 0.2rem
        font-size: 1.2rem
        line-height: 1.8rem
        .currency
            color: $color-gray-dark
    .thead-item
        .title
            font-weight: 500
            font-size: 1.4rem
            line-height: 2rem
</style>
