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
    &.center
        display: flex
        align-items: center
        justify-content: center

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