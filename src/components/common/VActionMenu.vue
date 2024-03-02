<template lang="pug">
    .action-menu
        .button-slot(@click="openMenu")
            slot(name="button")
        .menu(
            v-if="isOpen"
            v-click-outside="closeMenu"
        )
            button.menu-item(
                v-for="control in controls"
                :key="controls.key"
                :class="control.type"
                @click="control.callback(item)"
            )
                inline-svg.menu-icon(:src="control.icon")
                .menu-text {{ control.title }}
</template>

<script>
export default {
    name: 'VActionMenu',

    props: {
        controls: {
            type: Array,
            required: true,
        },

        item: {
            type: Object,
            default: () => ({}),
        },
    },

    data() {
        return {
            isOpen: false,
        };
    },

    methods: {
        closeMenu() {
            this.isOpen = false;
        },

        openMenu() {
            this.isOpen = true;
        },
    },
}
</script>

<style lang="sass" scoped>
.button-slot
    display: flex
    align-items: center
    justify-content: center
    margin: 0 auto
    cursor: pointer
    width: 2rem
    height: 2rem

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
        &.positive
            @media(any-hover:hover)
                &:hover
                    background: rgba($color-green, 0.15)
            .menu-text
                color: $color-green
            .menu-icon
                fill: rgba($color-green, 0.6)
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