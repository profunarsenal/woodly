<template lang="pug">
    button.button-mini
        inline-svg.icon(
            :src="`/icons/mini-buttons/${type}.svg`"
            :class="type"
        )
</template>

<script>
export default {
    name: 'ButtonMini',

    props: {
        type: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="sass" scoped>
.button-mini
    width: 2rem
    height: 2rem
    .icon
        width: 100%
        height: 100%
        transition: all 0.3s ease
        @media(any-hover:hover)
            &:hover
                &.confirm,
                &.decline,
                &.redirect
                    &:deep(rect)
                        fill-opacity: 1
                &.add,
                &.edit,
                &.option,
                &.receipt,
                &.attach,
                &.payout,
                &.qr,
                &.info,
                &.eye,
                &.eye-hide
                    &:deep(rect)
                        fill: $color-gray-dark
</style>