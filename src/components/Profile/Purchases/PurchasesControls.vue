<template lang="pug">
    template(v-if="isAvailableStatus")
        td.tbody-item
            .controls
                .control(:class="setClass('accept')")
                    button-mini(
                        type="add"
                        @click="openPopup('accept')"
                    )
                    v-tooltip.tooltip(
                        position="right"
                        :text="$lang.acceptDeal"
                    )
                    popup-confirm.popup(
                        v-if="popup.accept.isOpen"
                        :componentData="popupAcceptComponentData"
                    )
    template(v-else-if="isActiveStatus")
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
                        :text="$lang.cancelDeal"
                    )
                    popup-confirm.popup(
                        v-if="popup.cancel.isOpen"
                        :componentData="popupCancelComponentData"
                        type="negative"
                    )
                .control
                    button-mini(
                        type="attach"
                        @click="openModalAttachingCheck"
                    )
                    v-tooltip.tooltip(
                        position="right"
                        :text="$lang.attachCheck"
                    )
    template(v-else-if="isSuccessfulStatus")
        td.tbody-item
            .controls
                .control
                    button-mini(
                        type="receipt"
                        @click="showCheck"
                    )
                    v-tooltip.tooltip(
                        position="right"
                        :text="$lang.viewCheck"
                    )
    template(v-else)
        td.tbody-item
</template>

<script>
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import VTooltip from '@/components/common/VTooltip.vue';
import PopupConfirm from '@/components/Popup/PopupConfirm.vue';
import { PURCHASES_STATUSES } from '@/helpers/catalogs';

export default {
    name: 'PurchasesControls',

    components: {
        ButtonMini,
        VTooltip,
        PopupConfirm,
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
                accept: {
                    isOpen: false,
                },
                confirm: {
                    isOpen: false,
                },
                cancel: {
                    isOpen: false,
                },
            },
            popupAcceptComponentData: {
                title: this.$lang.acceptDeal,
                subtitle: this.$lang.areYouSureYouWantAcceptDeal,
                buttonCancel: this.$lang.cancel,
                buttonConfirm: this.$lang.accept,
                callbackConfirm: () => this.accept(),
                callbackCancel: () => this.closePopup('accept'),
            },
            popupConfirmComponentData: {
                title: this.$lang.confirmDeal,
                subtitle: this.$lang.areYouSureYouWantConfirmDeal,
                buttonCancel: this.$lang.cancel,
                buttonConfirm: this.$lang.confirm,
                callbackConfirm: () => this.confirm(),
                callbackCancel: () => this.closePopup('confirm'),
            },
            popupCancelComponentData: {
                title: this.$lang.cancelDeal,
                subtitle: this.$lang.areYouSureYouWantCancelDeal,
                buttonCancel: this.$lang.close,
                buttonConfirm: this.$lang.cancelDeal,
                callbackConfirm: () => this.cancel(),
                callbackCancel: () => this.closePopup('cancel'),
            },
        };
    },

    computed: {
        isAvailableStatus() {
            return this.item.status === PURCHASES_STATUSES.available.id;
        },

        isActiveStatus() {
            return this.item.status === PURCHASES_STATUSES.active.id;
        },

        isSuccessfulStatus() {
            return this.item.status === PURCHASES_STATUSES.successful.id;
        },
    },

    methods: {
        openPopup(popupName) {
            this.popup[popupName].isOpen = true;
        },

        closePopup(popupName) {
            this.popup[popupName].isOpen = false;
        },

        setClass(popupName) {
            return {
                open: this.popup[popupName].isOpen,
            };
        },

        async cancel() {
            try {
                await this.$store.dispatch('purchases/cancelPurchase', {
                    purchaseId: this.item.purchaseId,
                    status: PURCHASES_STATUSES.cancelled.id,
                });

                this.closePopup('cancel');
            } catch (error) {
                console.log(error);
            }
        },

        async confirm() {
            try {
                await this.$store.dispatch('purchases/confirmPurchase', {
                    purchaseId: this.item.purchaseId,
                    status: PURCHASES_STATUSES.successful.id,
                });

                this.closePopup('confirm');
            } catch (error) {
                console.log(error);
            }
        },

        async accept() {
            try {
                await this.$store.dispatch('purchases/acceptPurchase', {
                    purchaseId: this.item.purchaseId,
                    status: PURCHASES_STATUSES.active.id,
                });

                this.closePopup('accept');
            } catch (error) {
                console.log(error);
            }
        },

        async cancel() {
            try {
                await this.$store.dispatch('purchases/cancelPurchase', {
                    purchaseId: this.item.purchaseId,
                    status: PURCHASES_STATUSES.cancelled.id,
                });

                this.closePopup('cancel');
            } catch (error) {
                console.log(error);
            }
        },

        openModalAttachingCheck() {
            this.$store.commit('modal/open', {
                component: 'ModalAttachingCheck',
                positionCenter: true,
                componentData: this.item,
            });
        },

        showCheck() {
            this.$store.commit('modal/open', {
                component: 'ModalImage',
                componentData: this.item,
            });
        },
    },
};
</script>

<style lang="sass" scoped>
.tbody-item
    position: relative

.controls
    display: flex
    justify-content: flex-end
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
</style>