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
                template(#bankType="{ item }")
                    .bank {{ setBankType(item.bankType) }}
                template(#turnover="{ item }")
                    .turnover {{ `${item.turnoverPaymentsPerDay} / ${item.turnoverTransactionsPerDay}` }}
                template(#limitToday="{ item }")
                    .limit {{ `${item.paymentsLimitPerDay} / ${item.transactionsLimitPerDay}` }}
                template(#transactionsLimit="{ item }")
                    .limit {{ `${item.paymentMin}-${item.paymentMax}` }}
                template(#status="{ item }")
                    span.status-text(v-if="item.status === cardStatuses.deleted") Удалена
                    inline-svg.status(
                        v-else
                        :class="setIcon(item.status).class"
                        :src="setIcon(item.status).src"
                        @click="changeStatus(item)"
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
import EmptyForm from '@/components/app/EmptyForm.vue';
import CardsControls from '@/components/Profile/Cards/CardsControls.vue';

import { CARDS_TABLE_HEADERS } from '@/helpers/table';
import { BANK_TYPES, CARD_STATUSES } from '@/helpers/catalogs';

export default {
    name: 'ProfileCards',

    components: {
        ProfileWrapper,
        VTable,
        VButton,
        VTabs,
        CardsControls,
        EmptyForm,
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
            search: debounce(this.searchOnTable, 500),
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

        setIcon(status) {
            const STATUSES = {
                active: {
                    src: '/icons/checkmark-circle.svg',
                    class: 'active',
                },
                notActive: {
                    src: '/icons/close-circle.svg',
                    class: 'not-active',
                },
            };

            switch(status) {
                case CARD_STATUSES.active:
                    return STATUSES.active;
                case CARD_STATUSES.notActive:
                    return STATUSES.notActive;
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

        changeStatus(card) {
            const newStatus = card.status === CARD_STATUSES.active ?
                CARD_STATUSES.notActive :
                CARD_STATUSES.active;

            this.$store.dispatch('cards/changeStatus', {
                cardId: card.cardId,
                status: newStatus,
            });
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

.status
    width: 2rem
    height: 2rem
    display: flex
    align-items: center
    justify-content: center
    margin: 0 auto
    cursor: pointer
    &.active
        fill: $color-green
    &.not-active
        fill: $color-red-dark

.status-text
    color: $color-red-dark

.cards-table
    .tbody-item
        position: relative
</style>