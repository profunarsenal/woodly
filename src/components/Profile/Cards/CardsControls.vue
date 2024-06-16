<template lang="pug">
    .control
        button-mini(
            type="option"
            @click="openMenu"
        )
        v-action-menu(
            v-if="isOpen"
            v-click-outside="closeMenu"
            :controls="controls"
            :item="item"
        )
</template>

<script>
import VActionMenu from '@/components/common/VActionMenu.vue';
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import { CARD_STATUSES } from '@/helpers/catalogs';
import { API } from '@/helpers/constants';

export default {
    name: 'CardsControls',

    components: {
        VActionMenu,
        ButtonMini,
    },

    props: {
        item: {
            type: Object,
            default: () => ({}),
        },

        isEnabledTabActive: {
            type: Boolean,
            default: false,
        },

        isEnabledTabDeleted: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            isOpen: false,
        };
    },

    computed: {
        controls() {
            const controls = [
                {
                    isVisible: this.isEnabledTabActive,
                    key: 'limit',
                    icon: '/icons/settings.svg',
                    title: 'Установить лимит',
                    callback: (item) => {
                        this.$store.commit('modal/open', {
                            component: 'ModalSetLimit',
                            positionCenter: true,
                            componentData: item,
                        });
                    },
                },
                {
                    isVisible: this.isEnabledTabActive,
                    key: 'edit',
                    icon: '/icons/edit.svg',
                    title: 'Редактировать карту',
                    callback: (item) => {
                        this.$store.commit('modal/open', {
                            component: 'ModalCard',
                            componentData: item,
                        });
                    },
                },
                {
                    isVisible: this.isEnabledTabActive || this.isEnabledTabDeleted,
                    key: 'auto',
                    icon: '/icons/cards.svg',
                    title: 'Автоплатежи',
                    callback: (item) => {
                        this.$router.push({
                            path: `${API.profile.autoPayments}/${item.cardId}`,
                            query: {
                                cardLastNumber: item.cardLastNumber,
                            },
                        });
                    },
                },
                {
                    isVisible: this.isEnabledTabActive,
                    key: 'message',
                    icon: '/icons/message.svg',
                    title: 'Общие СМС',
                    callback: (item) => {
                        this.$router.push({
                            path: `${API.profile.cardMessages}/${item.cardId}`,
                            query: {
                                cardLastNumber: item.cardLastNumber,
                            },
                        });
                    },
                },
                {
                    isVisible: this.isEnabledTabActive,
                    key: 'delete',
                    icon: '/icons/delete.svg',
                    title: 'Удалить карту',
                    type: 'negative',
                    callback: (item) => {
                        this.$store.commit('modal/open', {
                            component: 'ModalConfirm',
                            positionCenter: true,
                            componentData: {
                                item,
                                type: 'negative',
                                title: 'Удаление карты',
                                subtitle: `Вы уверены, что хотите удалить карту ${item.title} · ${item.cardNumber}?`,
                                buttonConfirm: 'Удалить',
                                callbackConfirm: () => this.deleteCard(),
                            },
                        });
                    },
                },
                {
                    isVisible: this.isEnabledTabDeleted,
                    key: 'recovery',
                    icon: '/icons/rotate.svg',
                    title: 'Восстановить карту',
                    type: 'positive',
                    callback: (item) => {
                        this.$store.commit('modal/open', {
                            component: 'ModalConfirm',
                            positionCenter: true,
                            componentData: {
                                item,
                                type: 'positive',
                                title: 'Восстановление карты',
                                subtitle: `Вы уверены, что хотите восстановить карту ${item.title} · ${item.cardNumber}?`,
                                buttonConfirm: 'Восстановить',
                                callbackConfirm: () => this.deleteCard(),
                            },
                        });
                    },
                },
            ];

            return controls.filter(control => control.isVisible);
        },
    },

    methods: {
        openMenu() {
            this.isOpen = true;
        },

        closeMenu() {
            this.isOpen = false;
        },

        async deleteCard() {
            await this.$api.cards.changeCardStatus({
                cardId: this.item?.cardId,
                status: CARD_STATUSES.deleted,
            });

            this.$store.dispatch('cards/getCards', this.$route.query);
        },

        async recoveryCard() {
            await this.$api.cards.changeCardStatus({
                cardId:  this.item?.cardId,
                status: CARD_STATUSES.active,
            });

            this.$store.dispatch('cards/getCards', this.$route.query);
        },
    },
};
</script>

<style lang="sass" scoped>

</style>