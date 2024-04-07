<template lang="pug">
    .profile-cards
        .header
            .title Мои карты
            v-button(
                iconSrc="/icons/plus.svg"
                type="outline"
                size="small"
                @click="openModalCard"
            ) Добавить
            v-button.button-transactions(
                :type="buttonTransactions.type"
                size="small"
                @click="toggleTransactions"
            ) {{ buttonTransactions.value }}
        v-tabs.table-tabs(
            v-model="activeTab"
            :tabs="tableTabs"
            @select="toggleTable"
        )
        .loader(v-if="isLoadingCards")
            v-loader(size="big")
        template(v-else)
            v-table.cards-table(
                :headers="tableHeaders"
                :items="cards"
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
                        v-action-menu(
                            :controls="tableControls"
                            :item="item"
                        )
                            template(#button)
                                button-mini(type="option")
                template(#empty)
                    empty-form(
                        :imageSrc="emptyForm.src"
                        :title="emptyForm.title"
                        :subtitle="emptyForm.subtitle"
                    )
    app-pagination.pagination(
        v-if="pagination.pages > 1"
        :pages="pagination.pages"
        :limit="pagination.limit"
        :total="pagination.total"
        :count="cards.length"
    )
</template>

<script>
import debounce from 'lodash/debounce';
import { mapState } from 'vuex';
import AppPagination from '@/components/app/AppPagination.vue';
import VTable from '@/components/common/VTable.vue';
import VButton from '@/components/common/VButton.vue';
import VTabs from '@/components/common/VTabs.vue';
import VActionMenu from '@/components/common/VActionMenu.vue';
import VLoader from '@/components/common/VLoader.vue';
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import EmptyForm from '@/components/app/EmptyForm.vue';
import { CARDS_TABLE_HEADERS } from '@/helpers/table';
import { BANK_TYPES, CARD_STATUSES } from '@/helpers/catalogs';

export default {
    name: 'ProfileCards',

    components: {
        AppPagination,
        VTable,
        VButton,
        VTabs,
        VActionMenu,
        VLoader,
        ButtonMini,
        EmptyForm,
    },

    data() {
        return {
            tableHeaders: CARDS_TABLE_HEADERS,
            tableTabs: [
                { key: CARD_STATUSES.active, title: 'Активные' },
                { key: CARD_STATUSES.deleted, title: 'Удаленные' },
            ],
            urlParams: Object.assign({}, this.$route.query),
            activeTab: CARD_STATUSES.active,
            isLoadingCards: false,
            search: debounce(this.searchTable, 500),
        };
    },

    computed: {
        ...mapState({
            cards: ({ cards }) => cards.cards,
            pagination: ({ cards }) => cards.pagination,
            isWorkTransactions: ({ cards }) => cards.isWorkTransactions,
        }),

        tableControlsTabActive() {
            return [
                {
                    key: 'limit',
                    icon: '/icons/settings.svg',
                    title: 'Установить лимит',
                    callback: (item) => {
                        this.openModal({
                            component: 'ModalSetLimit',
                            positionCenter: true,
                            item,
                        });
                    },
                },
                {
                    key: 'edit',
                    icon: '/icons/edit.svg',
                    title: 'Редактировать карту',
                    callback: (item) => {
                        this.openModal({
                            component: 'ModalCard',
                            item,
                        });
                    },
                },
                {
                    key: 'auto',
                    icon: '/icons/cards.svg',
                    title: 'Автоплатежи',
                    callback: (item) => {
                        this.$router.push({
                            name: 'AutoPayments',
                            params: {
                                id: item.cardId,
                            },
                        });
                    },
                },
                {
                    key: 'message',
                    icon: '/icons/message.svg',
                    title: 'Общие СМС',
                    callback: (item) => {
                        this.$router.push('/card-messages/123');
                    },
                },
                {
                    key: 'delete',
                    icon: '/icons/delete.svg',
                    title: 'Удалить карту',
                    type: 'negative',
                    callback: (item) => {
                        this.openModal({
                            component: 'ModalCardDelete',
                            positionCenter: true,
                            item,
                        });
                    },
                },
            ];
        },

        tableControlsTabDeleted() {
            return [
                {
                    key: 'auto',
                    icon: '/icons/cards.svg',
                    title: 'Автоплатежи',
                    callback: (item) => {
                        this.$router.push('/auto-payments/123');
                    },
                },
                {
                    key: 'recovery',
                    icon: '/icons/rotate.svg',
                    title: 'Восстановить карту',
                    type: 'positive',
                    callback: (item) => {
                        this.openModal({
                            component: 'ModalCardRecovery',
                            positionCenter: true,
                            item,
                        });
                    },
                },
            ];
        },

        tableControls() {
            return this.isEnabledTabActive ? this.tableControlsTabActive : this.tableControlsTabDeleted;
        },

        isEnabledTabActive() {
            return this.activeTab === this.cardStatuses.active;
        },

        isEnabledTabDeleted() {
            return this.activeTab === this.cardStatuses.deleted;
        },

        emptyForm() {
            if (this.isEnabledTabActive) {
                return {
                    src: '/images/empty/card-positive.png',
                    title: 'У вас нет активных карт',
                    subtitle: 'Здесь будут храниться карты, которые можно добавить нажав кнопку «Добавить» в верхней части страницы',
                }
            }

            if (this.isEnabledTabDeleted) {
                return {
                    src: '/images/empty/card-negative.png',
                    title: 'У вас нет удаленных карт',
                    subtitle: 'Здесь будут храниться карты, которые вы удалили',
                }
            }
        },

        buttonTransactions() {
            return {
                type: this.isWorkTransactions ? 'negative' : 'positive',
                value: this.isWorkTransactions ? 'Выключить сделки' : 'Включить сделки',
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
                case this.cardStatuses.active:
                    return STATUSES.active;
                case this.cardStatuses.notActive:
                    return STATUSES.notActive;
            }
        },

        setBankType(type) {
            const bank = BANK_TYPES.find(item => item.id === type);
            return bank?.title || '';
        },

        toggleTransactions() {
            this.$store.dispatch('cards/toggleTransactionsStatus');
        },

        openModal(modal) {
            this.$store.commit('modal/open', {
                component: modal.component,
                positionCenter: modal.positionCenter ?? false,
                componentData: modal.item,
            });
        },

        openModalCard() {
            this.openModal({
                component: 'ModalCard',
            });
        },

        toggleTable() {
            if (this.activeTab === this.cardStatuses.deleted) {
                this.urlParams.status = this.cardStatuses.deleted;
            } else {
                delete this.urlParams.status;
            }

            this.$router.push({ query: this.urlParams });
        },

        searchTable(value, key) {
            this.urlParams[key] = value;
            this.$router.push({ query: this.urlParams });
        },

        changeStatus(card) {
            const newStatus = card.status === this.cardStatuses.active ?
                this.cardStatuses.notActive :
                this.cardStatuses.active;

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

    created() {
        this.cardStatuses = CARD_STATUSES;

        if (this.urlParams.hasOwnProperty('status')) {
            this.activeTab = this.cardStatuses.deleted;
        }

        this.getCards();
        this.$store.dispatch('cards/getTransactionsStatus');
    },
};
</script>

<style lang="sass" scoped>
.profile-cards
    display: flex
    flex-direction: column
    margin-top: 0.8rem
    padding: 2.4rem 3.2rem 9.8rem 3.2rem
    background-color: $color-white
    border-radius: 2rem 0 0 0
    width: 100%
    flex: 1 1 auto

.header
    display: flex
    align-items: center
    justify-content: flex-start
    gap: 1.6rem
    margin-bottom: 3.2rem
    .title
        font-weight: 600
        font-size: 3.2rem
        line-height: 3.2rem
    .button-transactions
        margin-left: auto

.table-tabs
    margin-bottom: 0.8rem

.loader
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    fill: $color-violet-100

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

.pagination
    position: fixed
    bottom: 3.8rem
    right: 0
    width: calc( 100% - 22rem )
    z-index: 50
</style>