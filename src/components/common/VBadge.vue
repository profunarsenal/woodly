<template lang="pug">
    .badge(:class="type") {{ value }}
</template>

<script>
export default {
    name: 'VBadge',

    props: {
        type: {
            type: String,
            default: '',
        },

        value: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="sass" scoped>
.badge
    padding: 0.2rem 0.4rem 0.3rem
    border-radius: 0.4rem
    font-weight: 500
    font-size: 1rem
    line-height: 1.2rem
    &.positive
        color: $color-white
        background-color: $color-green
    &.negative
        color: $color-white
        background-color: $color-red-dark
</style>