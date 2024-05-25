<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Выход из аккаунта
        .text Вы действительно хотите выйти из аккаунта?
        .buttons
            v-button(
                type="secondary"
                @click="close"
            ) Отменить
            v-button(
                type="negative"
                @click="logout"
            ) Выйти
</template>

<script>
import VButton from '@/components/common/VButton.vue';
import { API } from '@/helpers/constants';

export default {
    name: 'ModalCardDelete',

    components: {
        VButton,
    },

    props: {
        componentData: {
            type: Object,
            default: null,
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        logout() {
            this.$store.commit('auth/logout');
            this.$router.push(API.auth);
            this.close();
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