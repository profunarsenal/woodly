<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title {{ $lang.closingAllSessions }}
        .text {{ $lang.areYouSureYouWantCloseAllSessions }}
        .buttons
            v-button(
                type="secondary"
                @click="close"
            ) {{ $lang.cancel }}
            v-button {{ $lang.close }}
</template>

<script>
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'ModalSessions',

    components: {
        VButton,
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },
    },
};
</script>

<style lang="sass" scoped>
.wrapper
    position: relative
    width: 44.2rem
    padding: 2rem 2.4rem 2.4rem 2.4rem
    background-color: $color-white
    border-radius: 2.4rem
    .close
        position: absolute
        top: 2.4rem
        right: 2.4rem
        width: 2rem
        height: 2rem
        .icon
            fill: $color-gray-dark
            transition: fill 0.3s ease
        @media(any-hover:hover)
            &:hover
                .icon
                    fill: $color-black
    .title
        font-size: 2rem
        font-weight: 600
        line-height: 2.8rem
        margin-bottom: 3.2rem
    .text
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        margin-bottom: 4rem
    .buttons
        display: flex
        align-items: center
        gap: 0.8rem
        &:deep(.button)
            flex: 1
</style>