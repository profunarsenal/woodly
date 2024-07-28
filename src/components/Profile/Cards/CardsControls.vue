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

import { PAGES } from '@/helpers/constants';
import { CARD_STATUSES } from '@/helpers/catalogs';

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
                    title: this.$lang.setLimit,
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
                    title: this.$lang.editCard,
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
                    title: this.$lang.autoPayments,
                    callback: (item) => {
                        this.$router.push({
                            path: `${PAGES.profile.autoPayments}/${item.cardId}`,
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
                    title: this.$lang.generalSms,
                    callback: (item) => {
                        this.$router.push({
                            path: `${PAGES.profile.cardMessages}/${item.cardId}`,
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
                    title: this.$lang.deleteCard,
                    type: 'negative',
                    callback: (item) => {
                        this.$store.commit('modal/open', {
                            component: 'ModalConfirm',
                            positionCenter: true,
                            componentData: {
                                item,
                                type: 'negative',
                                title: this.$lang.removingCard,
                                subtitle: this.$lang.areYouSureYouWandDeleteCard(item.title, item.cardNumber),
                                buttonConfirm: this.$lang.delete,
                                callbackConfirm: () => this.changeStatus(CARD_STATUSES.deleted),
                            },
                        });
                    },
                },
                {
                    isVisible: this.isEnabledTabDeleted,
                    key: 'recovery',
                    icon: '/icons/rotate.svg',
                    title: this.$lang.restoreCard,
                    type: 'positive',
                    callback: (item) => {
                        this.$store.commit('modal/open', {
                            component: 'ModalConfirm',
                            positionCenter: true,
                            componentData: {
                                item,
                                type: 'positive',
                                title: this.$lang.recoveringCard,
                                subtitle: this.$lang.areYouSureYouWandRestoreCard(item.title, item.cardNumber),
                                buttonConfirm: this.$lang.restore,
                                callbackConfirm: () => this.changeStatus(CARD_STATUSES.active),
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

        async changeStatus(status) {
            await this.$store.dispatch('cards/changeStatus', {
                cardId: this.item?.cardId,
                status,
                urlParams: this.$route.query,
            });
        },
    },
};
</script>