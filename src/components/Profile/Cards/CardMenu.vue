<template lang="pug">
    button.button(@click="openMenu")
        inline-svg.button-icon(src="/icons/dot.svg")
    .menu(
        v-if="isOpen"
        v-click-outside="closeMenu"
    )
        button.menu-item(@click="openModalLimit")
            inline-svg.menu-icon(src="/icons/settings.svg")
            .menu-text Установить лимит
        button.menu-item(@click="openModalEdit")
            inline-svg.menu-icon(src="/icons/edit.svg")
            .menu-text Редактировать карту
        button.menu-item(@click="openAutoPayments")
            inline-svg.menu-icon(src="/icons/cards.svg")
            .menu-text Автоплатежи
        button.menu-item(@click="openCardMessages")
            inline-svg.menu-icon(src="/icons/message.svg")
            .menu-text Общие СМС
        button.menu-item.negative
            inline-svg.menu-icon(src="/icons/delete.svg")
            .menu-text Удалить карту
</template>

<script>
export default {
    name: 'ProfileCardMenu',

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            isOpen: false,
        };
    },

    methods: {
        openMenu() {
            this.isOpen = true;
        },

        closeMenu() {
            this.isOpen = false;
        },

        openModalLimit() {
            this.$store.commit('modal/open', {
                component: 'ModalSetLimit',
                positionCenter: true,
            });
        },

        openModalEdit() {
            this.$store.commit('modal/open', {
                component: 'ModalCard',
            });
        },

        openAutoPayments() {
            this.$router.push('/auto-payments/123');
        },

        openCardMessages() {
            this.$router.push('/card-messages/123');
        },
    },
}
</script>

<style lang="sass" scoped>
.button
    display: flex
    align-items: center
    justify-content: center
    margin: 0 auto
    background-color: $color-gray-dark
    width: 2rem
    height: 2rem
    border-radius: 0.6rem
    &-icon
        width: 1.6rem
        height: 1.6rem
        fill: $color-white

.menu
    position: absolute
    z-index: 3
    top: 95%
    right: 1.2rem
    padding: 0.8rem
    background-color: $color-white
    border-radius: 1.2rem
    border: 0.1rem solid $color-gray-100
    &-item
        display: flex
        align-items: center
        gap: 1rem
        padding: 1rem
        width: 100%
        transition: background-color 0.3s ease
        border-radius: 0.8rem
        @media(any-hover:hover)
            &:hover
                background-color: $color-gray-light
        &.negative
            @media(any-hover:hover)
                &:hover
                    background: rgba($color-red-light, 0.08)
            .menu-text
                color: $color-red-dark
            .menu-icon
                fill: rgba($color-red-dark, 0.5)
    &-text
        font-weight: 500
        font-size: 1.2rem
        line-height: 1.8rem
        white-space: nowrap
    &-icon
        width: 1.6rem
        height: 1.6rem
        fill: $color-gray-dark
</style>