<template lang="pug">
    profile-wrapper(
        :title="$lang.myCards"
        :pagination="pagination"
        :items="cards"
    )
        template(#header)
            v-button(
                iconSrc="/icons/plus.svg"
                type="outline"
                size="small"
                @click="openModalCard"
            ) {{ $lang.add }}
            v-button.button-transactions(
                :type="buttonTransactions.type"
                :isDisabled="isSwitching"
                :isLoading="isSwitching"
                size="small"
                @click="toggleTransactions"
            ) {{ buttonTransactions.value }}

        template(#content)
            v-tabs.table-tabs(
                v-model="activeTab"
                :tabs="tableTabs"
                @select="toggleTable"
            )
            v-table.cards-table(
                :headers="tableHeaders"
                :items="cards"
                :isLoading="isLoadingCards"
                @search="search"
            )
                template(#cardNumber="{ item }")
                    .card {{ formatCardNumber(item.cardNumber) }}
                template(#bankType="{ item }")
                    .bank
                        .text {{ setBankType(item.bankType) }}
                        .box(v-if="item.isSbp")
                            inline-svg.icon(src="/icons/pay/sbp.svg")
                template(#turnover="{ item }")
                    .turnover {{ `${item.turnoverPaymentsPerDay} / ${item.turnoverTransactionsPerDay}` }}
                template(#limitToday="{ item }")
                    .limit {{ `${item.paymentsLimitPerDay} / ${item.transactionsLimitPerDay}` }}
                template(#transactionsLimit="{ item }")
                    .limit {{ `${item.paymentMin}-${item.paymentMax}` }}
                template(#status="{ item }")
                    .status(
                        :class="getStatus(item.status, 'class')"
                        @click="changeStatus(item)"
                    )
                        span.text(v-if="item.status === cardStatuses.deleted") {{ $lang.removed }}
                        v-loader.loader(v-else-if="item.isChangingStatus")
                        template(v-else)
                            inline-svg.icon(:src="getStatus(item.status, 'src')")
                            v-tooltip.tooltip(
                                position="right"
                                :text="getStatus(item.status, 'tooltip')"
                            )
                template(#thead)
                    th.thead-item
                template(#tbody="{ item }")
                    td.tbody-item
                        cards-controls(
                            :item="item"
                            :isEnabledTabActive="isEnabledTabActive"
                            :isEnabledTabDeleted="isEnabledTabDeleted"
                        )
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
import VTable from '@/components/common/VTable.vue';
import VButton from '@/components/common/VButton.vue';
import VTabs from '@/components/common/VTabs.vue';
import EmptyForm from '@/components/Profile/EmptyForm.vue';
import CardsControls from '@/components/Profile/Cards/CardsControls.vue';
import VTooltip from '@/components/common/VTooltip.vue';
import VLoader from '@/components/common/VLoader.vue';

import { CARDS_TABLE_HEADERS } from '@/helpers/table';
import { BANK_TYPES, CARD_STATUSES } from '@/helpers/catalogs';
import { formatCardNumber } from '@/helpers/string';

export default {
    name: 'ProfileCards',

    components: {
        ProfileWrapper,
        VTable,
        VButton,
        VTabs,
        CardsControls,
        EmptyForm,
        VTooltip,
        VLoader,
    },

    data() {
        return {
            tableHeaders: CARDS_TABLE_HEADERS,
            tableTabs: [
                { key: CARD_STATUSES.active, title: this.$lang.active },
                { key: CARD_STATUSES.deleted, title: this.$lang.deleted },
            ],
            urlParams: Object.assign({}, this.$route.query),
            activeTab: CARD_STATUSES.active,
            isLoadingCards: false,
            isSwitching: false,
            isChangingStatus: false,
            search: debounce(this.searchOnTable, 500),
            formatCardNumber: formatCardNumber,
        };
    },

    computed: {
        ...mapState({
            cards: ({ cards }) => cards.cards,
            pagination: ({ cards }) => cards.pagination,
            isWorkTransactions: ({ cards }) => cards.isWorkTransactions,
        }),

        isEnabledTabActive() {
            return this.activeTab === CARD_STATUSES.active;
        },

        isEnabledTabDeleted() {
            return this.activeTab === CARD_STATUSES.deleted;
        },

        emptyForm() {
            if (this.isEnabledTabActive) {
                return {
                    src: '/images/empty/card-positive.png',
                    title: this.$lang.emptyActiveCardsTitle,
                    subtitle: this.$lang.emptyActiveCardsSubtitle,
                }
            }

            if (this.isEnabledTabDeleted) {
                return {
                    src: '/images/empty/card-negative.png',
                    title: this.$lang.emptyDeletedCardsTitle,
                    subtitle: this.$lang.emptyDeletedCardsSubtitle,
                }
            }
        },

        buttonTransactions() {
            return {
                type: this.isWorkTransactions ? 'negative' : 'positive',
                value: this.isWorkTransactions ? this.$lang.offTransactions : this.$lang.onTransactions,
            };
        },
    },

    methods: {
        async getCards() {
            this.isLoadingCards = true;

            try {
                await this.$store.dispatch('cards/getCards', this.urlParams);
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoadingCards = false;
            }
        },

        getStatus(status, key) {
            const keys = {
                active: {
                    src: '/icons/checkmark-circle.svg',
                    class: 'active',
                    tooltip: this.$lang.turnOff,
                },
                notActive: {
                    src: '/icons/close-circle.svg',
                    class:'not-active',
                    tooltip: this.$lang.turnOn,
                },
                deleted: {
                    class:'deleted',
                }
            };

            switch(status) {
                case CARD_STATUSES.active:
                    return keys.active[key];
                case CARD_STATUSES.notActive:
                    return keys.notActive[key];
                case CARD_STATUSES.deleted:
                    return keys.deleted[key];
            }
        },

        setBankType(type) {
            const bank = BANK_TYPES.find(item => item.id === type);
            return bank?.title || '';
        },

        async toggleTransactions() {
            try {
                this.isSwitching = true;
                await this.$store.dispatch('cards/toggleTransactionsStatus');
            } catch (error) {
                console.log(error);
            } finally {
                this.isSwitching = false;
            }
        },

        async getTransactionsStatus() {
            try {
                this.isSwitching = true;
                await this.$store.dispatch('cards/getTransactionsStatus');
            } catch (error) {
                console.log(error);
            } finally {
                this.isSwitching = false;
            }
        },

        openModalCard() {
            this.$store.commit('modal/open', {
                component: 'ModalCard',
            });
        },

        toggleTable() {
            if (this.activeTab === CARD_STATUSES.deleted) {
                this.urlParams.status = CARD_STATUSES.deleted;
            } else {
                delete this.urlParams.status;
            }

            this.$router.push({ query: this.urlParams });
        },

        searchOnTable(value, key) {
            this.urlParams[key] = value;
            this.$router.push({ query: this.urlParams });
        },

        async changeStatus(item) {
            if (item.isChangingStatus || item.status === CARD_STATUSES.deleted) {
                return;
            }

            const status = item.status === CARD_STATUSES.active ? CARD_STATUSES.notActive : CARD_STATUSES.active;

            try {
                item.isChangingStatus = true;
                await this.$store.dispatch('cards/changeStatus', {
                    cardId: item.cardId,
                    status,
                    urlParams: this.$route.query,
                });
            } catch (error) {
                console.log(error);
            } finally {
                delete item.isChangingStatus;
            }
        },
    },

    watch: {
        '$route.query': {
            handler(query) {
                this.urlParams = Object.assign({}, query);

                this.getCards();
            },
            deep: true,
        },
    },

    async created() {
        this.cardStatuses = CARD_STATUSES;

        if (this.urlParams.hasOwnProperty('status')) {
            this.activeTab = CARD_STATUSES.deleted;
        }

        await Promise.allSettled([
            this.getCards(),
            this.getTransactionsStatus(),
        ]);
    },
};
</script>

<style lang="sass" scoped>
.button-transactions
    margin-left: auto
    width: 16.1rem
    white-space: nowrap

.table-tabs
    margin-bottom: 0.8rem

.bank
    display: flex
    align-items: center
    justify-content: space-between
    gap: 0.6rem
    .box
        width: 1.8rem
        height: 1.8rem
        box-shadow: 0 0 0.8rem 0 rgba(0, 0, 0, 0.12)
        border-radius: 50%
        .icon
            width: 100%
            height: 100%

.status
    position: relative
    display: flex
    align-items: center
    justify-content: center
    border-radius: 0.6rem
    padding: 0.6rem 0.9rem
    margin: 0 auto
    .icon,
    .loader
        width: 2rem
        height: 2rem
    &.active
        cursor: pointer
        background-color: rgba($color-green, 0.08)
        .icon,
        .loader
            fill: $color-green
    &.not-active
        cursor: pointer
        background-color: rgba($color-red-dark, 0.08)
        .icon,
        .loader
            fill: $color-red-dark
    &.deleted
        background-color: rgba($color-red-dark, 0.08)
        .text
            color: $color-red-dark
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
    right: 100%
    top: 0.3rem
    transition: 0.2s ease

.cards-table
    .tbody-item
        position: relative
    &:deep(.table-item-status)
        padding: 0.3rem
</style>