<template lang="pug">
    .controls
        .control
            v-button(
                type="positive"
                size="mini"
                @click="openModal('confirm')"
            ) {{ $lang.confirm }}
        .control
            v-button(
                type="negative"
                size="mini"
                @click="openModal('reject')"
            ) {{ $lang.reject }}
</template>

<script>
import VButton from '@/components/common/VButton.vue';

import { getCurrencyValue } from '@/helpers/string';

export default {
    name: 'OrderedPaymentsControls',

    components: {
        VButton,
    },

    props: {
        payment: {
            type: Object,
            default: () => ({}),
        },
    },

    methods: {
        openModal(modalName) {
            const { amount } = this.payment;
            const componentData = {
                confirm: {
                    type: 'positive',
                    title: this.$lang.confirmationPayment,
                    subtitle: this.$lang.confirmationPaymentSubtitleModal('userID', getCurrencyValue(amount)),
                    buttonConfirm: this.$lang.confirm,
                    callbackConfirm: () => this.changeWithdrawalStatus('confirm'),
                },
                reject: {
                    type: 'negative',
                    title: this.$lang.rejectionPayment,
                    subtitle: this.$lang.rejectionPaymentSubtitleModal('userID', getCurrencyValue(amount)),
                    buttonConfirm: this.$lang.reject,
                    callbackConfirm: () => this.changeWithdrawalStatus('reject'),
                },
            }

            this.$store.commit('modal/open', {
                component: 'ModalConfirm',
                positionCenter: true,
                componentData: componentData[modalName],
            });
        },

        async changeWithdrawalStatus(type) {
            try {
                await this.$store.dispatch('withdrawals/changeWithdrawalStatus', {
                    withdrawalId: this.payment.withdrawalId,
                    params: this.$route.query,
                    type,
                });

                this.$store.dispatch('modal/close');
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style lang="sass" scoped>
.controls
    display: flex
    align-items: center
    gap: 0.4rem
    &:deep(.button)
        width: 100%

.control
    position: relative
    flex: 1

.popup
    position: absolute
    z-index: 10
    top: calc( 100% + 0.4rem )
    right: 0
</style>