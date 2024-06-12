<template lang="pug">
    td.tbody-item
        .controls
            .control
                button-mini(
                    type="info"
                    @click="openModalInfo"
                )
                v-tooltip.tooltip(
                    position="right"
                    text="Информация о тарифах"
                )
            .control
                button-mini(
                    type="edit"
                    @click="openModalUser"
                )
                v-tooltip.tooltip(
                    position="right"
                    text="Редактировать пользователя"
                )
</template>

<script>
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import VTooltip from '@/components/common/VTooltip.vue';

export default {
    name: 'UsersControls',

    components: {
        ButtonMini,
        VTooltip,
    },

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    methods: {
        openModalInfo() {},
        openModalUser() {
            this.$store.commit('modal/open', {
                component: 'ModalUser',
                positionCenter: true,
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
</style>