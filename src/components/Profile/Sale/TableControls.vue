<template lang="pug">
    template(v-if="isSuccessfulStatus")
        td.tbody-item(colspan="2")
    template(v-else-if="isReviewStatus")
        td.tbody-item
            .table-controls
                .table-control(:class="controlClasses")
                    button-mini(
                        type="confirm"
                        @click="openWindowConfirm"
                    )
                    v-tooltip.table-tooltip(
                        position="right"
                        text="Подтвердить сделку"
                    )
                    window-confirm.confirm-transaction(
                        v-if="isOpenWindowConfirm"
                        @cancel="closeWindowConfirm"
                        @confirm="confirmTransaction"
                    )
                button-mini(type="decline")
        td.tbody-item
            button-mini(type="option")
    template(v-else)
        td.tbody-item
            .table-control(:class="controlClasses")
                button-mini(
                    type="confirm"
                    @click="openWindowConfirm"
                )
                v-tooltip.table-tooltip(
                    position="right"
                    text="Подтвердить сделку"
                )
                window-confirm.confirm-transaction(
                    v-if="isOpenWindowConfirm"
                    @cancel="closeWindowConfirm"
                    @confirm="confirmTransaction"
                )
        td.tbody-item
            .table-control
                button-mini(
                    type="edit"
                    @click="openModalCorrection"
                )
                v-tooltip.table-tooltip(
                    position="right"
                    text="Корректировать заявку"
                )
</template>

<script>
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import VTooltip from '@/components/common/VTooltip.vue';
import WindowConfirm from '@/components/app/WindowConfirm.vue';
import { TRANSACTIONS_STATUSES } from '@/helpers/catalogs';

export default {
    name: 'TableControls',

    components: {
        ButtonMini,
        VTooltip,
        WindowConfirm,
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            isOpenWindowConfirm: false,
        };
    },

    computed: {
        isSuccessfulStatus() {
            return this.item.status === TRANSACTIONS_STATUSES.successful.id;
        },

        isReviewStatus() {
            return this.item.status === TRANSACTIONS_STATUSES.review.id
        },

        controlClasses() {
            return { 'open-window': this.isOpenWindowConfirm };
        }
    },

    methods: {
        openWindowConfirm() {
            this.isOpenWindowConfirm = true;
        },

        closeWindowConfirm() {
            this.isOpenWindowConfirm = false;
        },

        confirmTransaction() {
            console.log('confirmTransaction');
        },

        openModalCorrection() {
            this.$store.commit('modal/open', {
                component: 'ModalCorrection',
                positionCenter: true,
            });
        },
    },
};
</script>

<style lang="sass" scoped>
.table-controls
    display: flex
    gap: 0.8rem

.table-control
    width: 2rem
    height: 2rem
    position: relative
    &:not(.open-window)
        @media(any-hover:hover)
            &:hover
                .table-tooltip
                    opacity: 1
                    visibility: visible
                    pointer-events: all
                    transition: 0.4s ease 0.4s

.table-tooltip
    opacity: 0
    visibility: hidden
    pointer-events: none
    right: calc( 100% + 0.8rem )
    top: -0.3rem
    transition: 0.2s ease

.confirm-transaction
    position: absolute
    z-index: 10
    top: calc( 100% + 0.4rem )
    right: 0
</style>