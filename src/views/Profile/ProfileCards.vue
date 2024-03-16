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
            .toggle-buttons
                v-button(
                    v-if="isActiveTransactions"
                    type="negative"
                    size="small"
                    @click="offTransactions"
                ) Выключить сделки
                v-button(
                    v-else
                    type="positive"
                    size="small"
                    @click="onTransactions"
                ) Включить сделки
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
                template(#transactionsLimit="{ item }")
                    .limit {{ `${item.paymentMin}-${item.paymentMax}` }}
                template(#status="{ item }")
                    inline-svg.status(
                        :class="setIcon(item.status).class"
                        :src="setIcon(item.status).src"
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
        :pages="pagination.page"
        :count="pagination.count"
        :total="pagination.total"
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
import VLoader from '@//components/common/VLoader.vue';
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import EmptyForm from '@/components/app/EmptyForm.vue';
import { CARDS_TABLE_HEADERS } from '@/helpers/table';
import { BANK_TYPES } from '@/helpers/catalogs';

const TAB_KEYS = {
    active: 'active',
    deleted: 'deleted',
};

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
                { key: TAB_KEYS.active, title: 'Активные' },
                { key: TAB_KEYS.deleted, title: 'Удаленные' },
            ],
            urlParams: Object.assign({}, this.$route.query),
            activeTab: TAB_KEYS.active,
            isActiveTransactions: false,
            isLoadingCards: false,
            search: debounce(this.searchTable, 500),
        };
    },

    computed: {
        ...mapState({
            cards: ({ cards }) => cards.cards,
            pagination: ({ cards }) => cards.pagination,
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
                        this.$router.push('/auto-payments/123');
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
            return this.activeTab === TAB_KEYS.active;
        },

        isEnabledTabDeleted() {
            return this.activeTab === TAB_KEYS.deleted;
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
                deleted: {
                    src: '/icons/close-circle.svg',
                    class: 'deleted',
                },
            };

            return status ? STATUSES.active : STATUSES.deleted;
        },

        setBankType(type) {
            const bank = BANK_TYPES.find(item => item.id === type);
            return bank?.title || '';
        },

        offTransactions() {
            this.isActiveTransactions = false;
        },

        onTransactions() {
            this.isActiveTransactions = true;
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
            if (this.activeTab === TAB_KEYS.deleted) {
                this.urlParams.status = false;
            } else {
                delete this.urlParams.status;
            }

            this.$router.push({ query: this.urlParams });
        },

        searchTable(value, key) {
            this.urlParams[key] = value;
            this.$router.push({ query: this.urlParams });
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
        if (this.urlParams.hasOwnProperty('status')) {
            this.activeTab = TAB_KEYS.deleted;
        }

        this.getCards();
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
    .toggle-buttons
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
    &.active
        fill: $color-green
    &.deleted
        fill: $color-red-dark

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