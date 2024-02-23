<template lang="pug">
    footer.footer
        a.docs(
            href="#"
            target="_blank"
        ) Документация API
        .copy © 2024 Woodly, Inc
</template>

<script>
export default {
    name: 'AppFooter',
};
</script>

<style lang="sass" scoped>
.footer
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    padding: 1rem 3.2rem
    background-color: $color-gray-light-2
    &::after
        content: ''
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 0.1rem
        background-color: $color-gray-100
    .docs,
    .copy
        font-size: 1.2rem
        line-height: 1.8rem
        color: $color-gray-dark
</style>