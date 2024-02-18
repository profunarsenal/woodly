<template lang="pug">
    transition(name="modal")
        .modal(
            v-if="isOpened"
            :class="modalClasses"
        )
            component(
                :is="component"
                :componentData="componentData"
            )
</template>

<script>
import { defineAsyncComponent } from 'vue'
import { mapState } from 'vuex';

export default {
    name: 'VModal',

    components: {
        ModalCancelPayment: defineAsyncComponent(() => import('@/components/Payment/Modal/ModalCancel.vue')),
        ModalInsurance: defineAsyncComponent(() => import('@/components/Payment/Modal/ModalInsurance.vue')),
        ModalQR: defineAsyncComponent(() => import('@/components/Payment/Modal/ModalQR.vue')),
        ModalMoreInfo: defineAsyncComponent(() => import('@/components/Payment/Modal/ModalMoreInfo.vue')),
        ModalCardQiwi: defineAsyncComponent(() => import('@/components/Payment/Modal/Instructions/ModalCardQiwi.vue')),
        ModalCardYoomoney: defineAsyncComponent(() => import('@/components/Payment/Modal/Instructions/ModalCardYoomoney.vue')),
        ModalSbp: defineAsyncComponent(() => import('@/components/Payment/Modal/Instructions/ModalSbp.vue')),
        ModalSbpYoomoney: defineAsyncComponent(() => import('@/components/Payment/Modal/Instructions/ModalSbpYoomoney.vue')),
        ModalSbpQiwi: defineAsyncComponent(() => import('@/components/Payment/Modal/Instructions/ModalSbpQiwi.vue')),
    },

    computed: {
        ...mapState({
            componentData: state => state.modal.componentData,
            component: state => state.modal.component,
            positionCenter: state => state.modal.positionCenter,
        }),

        isOpened() {
            return this.component ? true : false;
        },

        modalClasses() {
            return { center: this.positionCenter };
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },
    },
};
</script>

<style lang="sass" scoped>
.modal
    position: fixed
    z-index: 99
    top: 0
    left: 0
    width: 100%
    height: 100%
    background-color: rgba(0, 0, 0, 0.6)
    padding-top: 4rem
    overflow-y: auto
    .wrapper
        margin: 0 auto
    &.center
        display: flex
        align-items: center
        justify-content: center
        padding: 0
        overflow-y: hidden
        .wrapper
            margin: 0

.modal-enter-active,
.modal-leave-active
    transition: opacity 0.3s ease

.modal-enter-from,
.modal-leave-to
    opacity: 0

.modal-enter-to,
.modal-leave-from
    opacity: 1
</style>