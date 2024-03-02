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
        )
        v-table.table(
            :headers="tableHeaders"
            :items="cards"
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
    app-pagination.pagination
</template>

<script>
import AppPagination from '@/components/Pagination/AppPagination.vue';
import VTable from '@/components/common/VTable.vue';
import VButton from '@/components/common/VButton.vue';
import VTabs from '@/components/common/VTabs.vue';
import VActionMenu from '@/components/common/VActionMenu.vue';
import ButtonMini from '@/components/app/ButtonMini.vue';
import { CARDS_TABLE_HEADERS } from '@/helpers/table';
import { CARD_STATUSES, BANK_TYPES } from '@/helpers/catalogs';

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
        ButtonMini,
    },

    data() {
        return {
            tableHeaders: CARDS_TABLE_HEADERS,
            tableTabs: [
                { key: TAB_KEYS.active, title: 'Активные' },
                { key: TAB_KEYS.deleted, title: 'Удаленные' },
            ],
            activeTab: TAB_KEYS.active,
            isActiveTransactions: false,
            cards: [],
        }
    },

    computed: {
        tableControlsTabActive() {
            return [
                {
                    key: 'limit',
                    icon: '/icons/settings.svg',
                    title: 'Установить лимит',
                    callback: (item) => {
                        this.openModal('ModalSetLimit', true);
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
                        this.openModal('ModalCardDelete', true);
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
                        this.openModal('ModalCardRecovery', true);
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
    },

    methods: {
        setIcon(status) {
            switch (status) {
                case CARD_STATUSES.active:
                    return {
                        src: '/icons/checkmark-circle.svg',
                        class: 'active',
                    };
                case CARD_STATUSES.deleted:
                    return {
                        src: '/icons/close-circle.svg',
                        class: 'deleted',
                    };
            };
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
    },

    async created() {
        const { data: cards } = await this.$api.cards.getCards();
        this.cards = cards;
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

.table
    .tbody-item
        position: relative

.pagination
    position: fixed
    bottom: 3.8rem
    right: 0
    width: calc( 100% - 22rem )
    z-index: 50
</style>