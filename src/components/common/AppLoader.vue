<template lang="pug">
    inline-svg.loader(src="/icons/loader.svg")
</template>

<script>
export default {
    name: 'AppLoader',
};
</script>

<style lang="sass" scoped>
.loader
    width: 2.4rem
    height: 2.4rem
    animation: spin 1s infinite linear

@keyframes spin
    0%
        transform: rotate(0)
    100%
        transform: rotate(360deg)
</style>