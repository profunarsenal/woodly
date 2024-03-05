<template lang="pug">
    inline-svg.loader(
        :class="size"
        src="/icons/loader.svg"
    )
</template>

<script>
export default {
    name: 'VLoader',

    props: {
        size: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="sass" scoped>
.loader
    width: 2.4rem
    height: 2.4rem
    animation: spin 1s infinite linear
    &.big
        width: 6.4rem
        height: 6.4rem

@keyframes spin
    0%
        transform: rotate(0)
    100%
        transform: rotate(360deg)
</style>