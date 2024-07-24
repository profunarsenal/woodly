<template lang="pug">
    .empty
        img.image(
            v-if="imageSrc"
            :src="imageSrc"
        )
        .title {{ title }}
        .subtitle {{ subtitle }}
</template>

<script>
export default {
    name: 'EmptyForm',

    props: {
        imageSrc: {
            type: String,
            default: '',
        },

        title: {
            type: String,
            default: '',
        },

        subtitle: {
            type: String,
            default: '',
        },
    },
};
</script>

<style lang="sass" scoped>
.empty
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    height: 100%
    .image
        width: 12.4rem
        height: 12.4rem
        margin-bottom: 1.2rem
    .title
        font-weight: 600
        font-size: 1.6rem
        line-height: 2.4rem
        margin-bottom: 0.4rem
    .subtitle
        max-width: 34.4rem
        font-size: 1.2rem
        line-height: 1.8rem
        text-align: center
        color: $color-gray-dark
</style>