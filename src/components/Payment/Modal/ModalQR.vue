<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Отсканируйте QR-код
        .text Это можно сделать в мобильном приложении банка или штатной камерой телефона
        img.code(src="/images/code.png")
        v-button(
            type="secondary"
            @click="close"
        ) Закрыть
</template>

<script>
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'ModalQR',

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

<style lang="sass">
.wrapper
    position: relative
    display: flex
    flex-direction: column
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
        margin-bottom: 1.6rem
    .text
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        margin-bottom: 4rem
    .code
        margin-bottom: 4rem
</style>