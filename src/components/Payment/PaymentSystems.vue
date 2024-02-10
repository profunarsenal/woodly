<template lang="pug">
    .system
        .title Выберите удобный способ оплаты
        .types
            .type(
                v-for="system in systems"
                :key="system.id"
                @click="$emit('select', system)"
            )
                img.icon(
                    v-if="system.icon"
                    :src="system.icon"
                )
                .name {{ system.title }}
</template>

<script>
export default {
    name: 'PaymentSystems',

    emits: ['select'],

    props: {
        systems: {
            type: Array,
            default: () => [],
        },
    },
};
</script>

<style lang="sass" scoped>
.system
    padding: 2rem 1.6rem 1.6rem 1.6rem
    width: 44.2rem
    border-radius: 1.6rem
    background-color: $color-white
    .title
        margin-bottom: 3.2rem
        font-weight: 500
        text-align: center
    .types
        display: flex
        flex-wrap: wrap
        gap: 0.8rem
    .type
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        gap: 0.6rem
        width: 20.1rem
        height: 10rem
        border-radius: 1.2rem
        background-color: $color-gray-light
        cursor: pointer
        transition: border 0.3s ease
        @media(any-hover:hover)
            &:hover
                border: 1px solid $color-violet-100
        .icon
            width: 4.4rem
            height: 4.4rem
        .name
            font-size: 1.2rem
            line-height: 1.8rem
            color: $color-gray-dark
</style>