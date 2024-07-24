<template lang="pug">
    button.button(@click="$emit('click')")
        inline-svg.icon(:src='icon')
</template>

<script>
export default {
    name: 'ButtonSquare',

    props: {
        icon: {
            type: String,
            required: true,
        },
    },
};
</script>

<style lang="sass" scoped>
.button
    display: flex
    align-items: center
    justify-content: center
    width: 4rem
    height: 4rem
    border: 0.1rem solid $color-gray-100
    border-radius: 1rem
    background-color: $color-white
    transition: all 0.3s ease
    .icon
        width: 1.6rem
        height: 1.6rem
    @media(any-hover:hover)
        &:hover
            background-color: $color-gray-light
            border: 0.1rem solid $color-silver
</style>