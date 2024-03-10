<template lang="pug">
    .tooltip(:class="position")
        inline-svg.icon(
            v-if="iconSrc"
            :src="iconSrc"
        )
        .text {{ text }}
</template>

<script>
export default {
    name: 'VTooltip',

    props: {
        iconSrc: {
            type: String,
            default: '',
        },

        text: {
            type: String,
            default: '',
        },

        position: {
            type: String,
            default: 'left',
        },
    },
};
</script>

<style lang="sass" scoped>
.tooltip
    position: absolute
    display: flex
    align-items: center
    gap: 0.6rem
    white-space: nowrap
    padding: 0.4rem 0.8rem
    background-color: $color-black
    border-radius: 0.8rem
    .text
        font-size: 1.2rem
        line-height: 1.8rem
        color: $color-white
    &::after
        content: ''
        position: absolute
        width: 0.9rem
        height: 0.9rem
        background-color: $color-black
    &.left
        &::after
            top: 50%
            left: -0.4rem
            transform: translateY(-50%) rotate(45deg)
    &.right
        &::after
            top: 50%
            right: -0.4rem
            transform: translateY(-50%) rotate(45deg)
    &.top
        &::after
            top: -0.4rem
            left: 50%
            transform: translateX(-50%) rotate(45deg)
    &.bottom
        &::after
            bottom: -0.4rem
            left: 50%
            transform: translateX(-50%) rotate(45deg)
</style>