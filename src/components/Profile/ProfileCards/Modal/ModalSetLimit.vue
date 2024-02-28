<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Установка лимитов
        .form
            v-input(label="Суточный оборот")
            v-input(label="Максимальное количество платежей (сутки)")
            v-input(label="Минимальный платеж")
            v-input(label="Максимальный платеж")
        v-button.button Подтвердить
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'ModalSetLimit',

    components: {
        VInput,
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
    .form
        display: flex
        flex-direction: column
        gap: 2rem
        margin-bottom: 4rem
    .button
        width: 100%
</style>