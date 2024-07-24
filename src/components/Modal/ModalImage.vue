<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close-large.svg")
        img.image(src="https://i.postimg.cc/9Fcm4ghb/image-10.png")
</template>

<script>
export default {
    name: 'ModalImage',

    methods: {
        close() {
            this.$store.commit('modal/close');
        },
    },
};
</script>

<style lang="sass" scoped>
.wrapper
    position: relative
    width: max-content
    height: max-content

.close
    position: absolute
    top: 0
    right: -5.2rem
    width: 4rem
    height: 4rem
    border-radius: 1rem
    background-color: rgba($color-black, 0.16)
    transition: all 0.3s ease
    .icon
        fill: $color-white
    @media(any-hover:hover)
        &:hover
            background-color: rgba($color-black, 0.56)

.image
    width: 100%
    height: 100%
    object-fit: contain
</style>