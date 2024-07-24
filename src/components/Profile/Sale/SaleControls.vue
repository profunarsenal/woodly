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
                        :text="$lang.confirmDeal"
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
                        :text="$lang.rejectVerification"
                    )
                    popup-confirm.popup(
                        v-if="popup.cancel.isOpen"
                        :componentData="popupDeclineComponentData"
                        type="negative"
                    )
        td.tbody-item
            button-mini(
                type="option"
                @click="openMenuControls"
            )
            v-action-menu(
                v-if="isOpenMenuControls"
                v-click-outside="closeMenuControls"
                :controls="menuControls"
                :item="item"
            )
    template(v-else)
        td.tbody-item
            .control(:class="setClass('confirm')")
                button-mini(
                    type="confirm"
                    @click="openPopup('confirm')"
                )
                v-tooltip.tooltip(
                    position="right"
                    :text="$lang.confirmDeal"
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
                    :text="$lang.correctApplication"
                )
</template>

<script>
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import VTooltip from '@/components/common/VTooltip.vue';
import PopupConfirm from '@/components/Popup/PopupConfirm.vue';
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
            isOpenMenuControls: false,
            popup: {
                confirm: {
                    isOpen: false,
                },
                cancel: {
                    isOpen: false,
                },
            },
            popupConfirmComponentData: {
                title: this.$lang.confirmVerification,
                subtitle: this.$lang.areYouSureYouWantConfirmTransactionVerification,
                buttonCancel: this.$lang.cancel,
                buttonConfirm: this.$lang.confirm,
                callbackConfirm: () => this.confirm(),
                callbackCancel: () => this.closePopup('confirm'),
            },
            popupDeclineComponentData: {
                title: this.$lang.rejectVerification,
                subtitle: this.$lang.areYouSureYouWantRejectTransactionVerification,
                buttonCancel: this.$lang.cancel,
                buttonConfirm: this.$lang.reject,
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

        menuControls() {
            return [
                {
                    key: 'correct',
                    icon: '/icons/edit.svg',
                    title: this.$lang.correctApplication,
                    callback: () => this.openModalCorrection(),
                },
                {
                    key: 'correct',
                    icon: '/icons/bill.svg',
                    title: this.$lang.viewCheck,
                    callback: () => () => ({}),
                },
            ];
        },
    },

    methods: {
        openMenuControls() {
            this.isOpenMenuControls = true;
        },

        closeMenuControls() {
            this.isOpenMenuControls = false;
        },

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
                    status: TRANSACTIONS_STATUSES.cancelled.id,
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