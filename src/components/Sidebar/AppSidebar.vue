<template lang="pug">
    .sidebar
        inline-svg.logo(src="/images/logo.svg")
        ul.menu
            li.item(
                v-for="item in items"
                :key="item.id"
            )
                router-link.link(:to="item.path")
                    inline-svg.icon(:src="item.icon")
                    span.text {{ item.title }}
        .buttons
            button.button
                inline-svg.icon(src="/icons/headphone.svg")
                span.text Поддержка
            button.button(@click="openModalExit")
                inline-svg.icon(src="/icons/exit.svg")
                span.text Выйти
</template>

<script>
import { API } from '@/helpers/constants';

export default {
    name: 'AppSidebar',

    props: {
        items: {
            type: Array,
            required: true,
        },
    },

    methods: {
        openModalExit() {
            this.$store.commit('modal/open', {
                component: 'ModalConfirm',
                positionCenter: true,
                componentData: {
                    type: 'negative',
                    title: 'Выход из аккаунта',
                    subtitle: 'Вы действительно хотите выйти из аккаунта?',
                    buttonConfirm: 'Выйти',
                    callbackConfirm: () => this.logout(),
                },
            });
        },

        logout() {
            this.$store.commit('auth/logout');
            this.$router.push(API.auth);
        },
    },
};
</script>

<style lang="sass" scoped>
.link-style
    display: flex
    align-items: center
    gap: 1.2rem
    padding: 1.2rem
    border-radius: 1.2rem
    color: rgba($color-white, 0.7)
    transition: background-color 0.3s ease
    @media(any-hover:hover)
        &:hover
            background-color: rgba($color-white, 0.1)
    .icon
        width: 2.4rem
        height: 2.4rem
        fill: rgba($color-white, 0.7)
    .text
        font-weight: 500
        font-size: 1.6rem
        line-height: 2.4rem

.link-style-active
    background-color: rgba($color-white, 0.16)
    color: $color-white
    .icon
        fill: $color-white

.sidebar
    min-width: 22rem
    max-width: 22rem
    padding: 3.2rem 1.6rem 2.4rem
    display: flex
    flex-direction: column
    background-color: $color-violet-100
    .logo
        margin: 0 1.5rem
    .menu
        margin-top: 3.6rem
        display: flex
        flex-direction: column
        gap: 0.4rem
    .link
        @extend .link-style
        &.router-link-exact-active,
        &.router-link-active
            @extend .link-style-active
    .buttons
        margin-top: auto
        display: flex
        flex-direction: column
        gap: 0.4rem
        .button
            @extend .link-style
            &:active
                @extend .link-style-active
</style>