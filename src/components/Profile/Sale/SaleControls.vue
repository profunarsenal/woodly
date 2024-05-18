<template lang="pug">
    template(v-if="isSuccessfulStatus")
        td.tbody-item(colspan="2")
    template(v-else-if="isReviewStatus")
        td.tbody-item
            .controls
                .control(:class="setClass('confirm')")
                    button-mini(
                        type="confirm"
                        @click="openPopup('confirm')"
                    )
                    v-tooltip.tooltip(
                        position="right"
                        text="Подтвердить сделку"
                    )
                    popup-confirm.popup(
                        v-if="popup.confirm.isOpen"
                        :componentData="popupConfirmComponentData"
                        type="positive"
                    )
                .control(:class="setClass('cancel')")
                    button-mini(
                        type="decline"
                        @click="openPopup('cancel')"
                    )
                    v-tooltip.tooltip(
                        position="right"
                        text="Отклонить проверку"
                    )
                    popup-confirm.popup(
                        v-if="popup.cancel.isOpen"
                        :componentData="popupDeclineComponentData"
                        type="negative"
                    )
        td.tbody-item
             v-action-menu.action-menu(
                :controls="menuItems"
                :item="item"
            )
                template(#button)
                    button-mini(type="option")
    template(v-else)
        td.tbody-item
            .control(:class="setClass('confirm')")
                button-mini(
                    type="confirm"
                    @click="openPopup('confirm')"
                )
                v-tooltip.tooltip(
                    position="right"
                    text="Подтвердить сделку"
                )
                popup-confirm.popup(
                    v-if="popup.confirm.isOpen"
                    :componentData="popupConfirmComponentData"
                    type="positive"
                )
        td.tbody-item
            .control
                button-mini(
                    type="edit"
                    @click="openModalCorrection"
                )
                v-tooltip.tooltip(
                    position="right"
                    text="Корректировать заявку"
                )
</template>

<script>
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import VTooltip from '@/components/common/VTooltip.vue';
import PopupConfirm from '@/components/app/PopupConfirm.vue';
import VActionMenu from '@/components/common/VActionMenu.vue';
import { TRANSACTIONS_STATUSES } from '@/helpers/catalogs';

export default {
    name: 'TableControls',

    components: {
        ButtonMini,
        VTooltip,
        PopupConfirm,
        VActionMenu,
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            popup: {
                confirm: {
                    isOpen: false,
                },
                cancel: {
                    isOpen: false,
                },
            },
            popupConfirmComponentData: {
                title: 'Подтвердить проверку',
                subtitle: 'Вы уверены, что хотите подтвердить проверку сделки?',
                buttonCancel: 'Отменить',
                buttonConfirm: 'Подтвердить',
                callbackConfirm: () => this.confirm(),
                callbackCancel: () => this.closePopup('confirm'),
            },
            popupDeclineComponentData: {
                title: 'Отклонить проверку',
                subtitle: 'Вы уверены, что хотите отклонить проверку сделки?',
                buttonCancel: 'Отменить',
                buttonConfirm: 'Отклонить',
                callbackConfirm: () => this.cancel(),
                callbackCancel: () => this.closePopup('cancel'),
            },
        };
    },

    computed: {
        isSuccessfulStatus() {
            return this.item.status === TRANSACTIONS_STATUSES.successful.id;
        },

        isReviewStatus() {
            return this.item.status === TRANSACTIONS_STATUSES.review.id;
        },

        menuItems() {
            return [
                {
                    key: 'correct',
                    icon: '/icons/edit.svg',
                    title: 'Корректировать заявку',
                    callback: () => this.openModalCorrection(),
                },
            ];
        },
    },

    methods: {
        openPopup(popupName) {
            this.popup[popupName].isOpen = true;
        },

        closePopup(popupName) {
            this.popup[popupName].isOpen = false;
        },

        async confirm() {
            try {
                await this.$store.dispatch('transactions/confirmTransaction', {
                    transactionId: this.item.transactionId,
                    status: TRANSACTIONS_STATUSES.successful.id,
                });

                this.closePopup('confirm');
            } catch (error) {
                console.log(error);
            }
        },

        async cancel() {
            try {
                await this.$store.dispatch('transactions/cancelTransaction', {
                    transactionId: this.item.transactionId,
                    status: TRANSACTIONS_STATUSES.canceled.id,
                });

                this.closePopup('cancel');
            } catch (error) {
                console.log(error);
            }
        },

        openModalCorrection() {
            this.$store.commit('modal/open', {
                component: 'ModalCorrection',
                positionCenter: true,
                componentData: this.item,
            });
        },

        setClass(popupName) {
            return {
                open: this.popup[popupName].isOpen,
            };
        },
    },
};
</script>

<style lang="sass" scoped>
.controls
    display: flex
    gap: 0.8rem

.control
    width: 2rem
    height: 2rem
    position: relative
    &:not(.open)
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
    right: calc( 100% + 0.8rem )
    top: -0.3rem
    transition: 0.2s ease

.popup
    position: absolute
    z-index: 10
    top: calc( 100% + 0.4rem )
    right: 0

.tbody-item
    position: relative

.action-menu
    &:deep(.menu)
        top: 60%
</style>