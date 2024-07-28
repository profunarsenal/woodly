<template lang="pug">
    td.tbody-item
        .controls(:class="{ admin: isAdmin }")
            .control
                button-mini(
                    type="info"
                    @click="openModalInfo"
                )
                v-tooltip.tooltip(
                    position="right"
                    :text="$lang.payoutInformation"
                )

            .control(
                v-if="isAdmin && (isCreatedStatus || isWaitingStatus)"
                :class="setClass('confirm')"
            )
                button-mini(
                    type="confirm"
                    @click="openPopup('confirm')"
                )
                v-tooltip.tooltip(
                    position="right"
                    :text="$lang.confirmPayout"
                )
                popup-confirm.popup(
                    v-if="popup.confirm.isOpen"
                    :componentData="popupConfirmComponentData"
                    type="positive"
                )

            .control(
                v-if="isAdmin && isCreatedStatus"
                :class="setClass('cancel')"
            )
                button-mini(
                    type="decline"
                    @click="openPopup('cancel')"
                )
                v-tooltip.tooltip(
                    position="right"
                    :text="$lang.cancelPayout"
                )
                popup-confirm.popup(
                    v-if="popup.cancel.isOpen"
                    :componentData="popupCancelComponentData"
                    type="negative"
                )

            .control(v-if="isAdmin && isCreatedStatus")
                button-mini(
                    type="redirect"
                    @click="() => ({})"
                )
                v-tooltip.tooltip(
                    position="right"
                    :text="$lang.redirectPayout"
                )

            .control(v-if="isAdmin && isSentStatus")
                button-mini(
                    type="receipt"
                    @click="() => ({})"
                )
                v-tooltip.tooltip(
                    position="right"
                    :text="$lang.viewCheck"
                )
</template>

<script>
import { mapGetters } from 'vuex';

import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import VTooltip from '@/components/common/VTooltip.vue';
import PopupConfirm from '@/components/Popup/PopupConfirm.vue';

import { PAYOUTS_STATUSES, PURCHASES_STATUSES } from '@/helpers/catalogs';

export default {
    name: 'PayoutsControls',

    components: {
        ButtonMini,
        VTooltip,
        PopupConfirm,
    },

    props: {
        item: {
            type: Object,
            default: () => ({}),
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
                title: this.$lang.confirmPayout,
                subtitle: this.$lang.areYouSureYouWantConfirmPayout,
                buttonCancel: this.$lang.cancel,
                buttonConfirm: this.$lang.confirm,
                callbackConfirm: () => this.changePayoutStatus('confirm'),
                callbackCancel: () => this.closePopup('confirm'),
            },
            popupCancelComponentData: {
                title: this.$lang.cancelPayout,
                subtitle: this.$lang.areYouSureYouWantCancelPayout,
                buttonCancel: this.$lang.close,
                buttonConfirm: this.$lang.cancelPayout,
                callbackConfirm: () => this.changePayoutStatus('cancel'),
                callbackCancel: () => this.closePopup('cancel'),
            },
        };
    },

    computed: {
        ...mapGetters({
            isAdmin: 'auth/isAdmin',
        }),

        isCreatedStatus() {
            return this.item?.status === PAYOUTS_STATUSES.created.id;
        },

        isSentStatus() {
            return this.item?.status === PAYOUTS_STATUSES.sent.id;
        },

        isWaitingStatus() {
            return this.item?.status === PAYOUTS_STATUSES.waiting.id;
        },
    },

    methods: {
        openModalInfo() {
            this.$store.commit('modal/open', {
                component: 'ModalPayoutInfo',
                positionCenter: true,
                componentData: this.item,
            });
        },

        async changePayoutStatus(popupName) {
            const statuses = {
                confirm: PURCHASES_STATUSES.successful.id,
                cancel: PURCHASES_STATUSES.cancelled.id,
            };

            try {
                await this.$store.dispatch('purchases/changePurchaseStatus', {
                    purchaseId: this.item.purchaseId,
                    status: statuses[popupName],
                });

                this.closePopup(popupName);
            } catch (error) {
                console.log(error);
            }
        },

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
    },
};
</script>

<style lang="sass" scoped>
.tbody-item
    position: relative

.controls
    display: flex
    align-items: center
    justify-content: center
    gap: 0.8rem
    height: 100%
    &.admin
        justify-content: flex-start

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