<template lang="pug">
    button.button(
        :class="type"
        :disabled="isLoading || isDisabled"
        @click="$emit('click')"
    )
        app-loader(v-if="isLoading")
        template(v-else)
            slot
            slot(name="icon")
</template>

<script>
import AppLoader from '@/components/common/AppLoader.vue';

export default {
    name: 'AppButton',

    emits: ['click'],

    components: {
        AppLoader,
    },

    props: {
        type: {
            type: String,
            default: 'primary',
        },

        isDisabled: {
            type: Boolean,
            default: false,
        },

        isLoading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="sass" scoped>
.button
    display: flex
    align-items: center
    justify-content: center
    padding: 1.2rem 1.8rem
    gap: 0.8rem
    height: 4.4rem
    font-size: 1.4rem
    font-weight: 500
    line-height: 2rem
    border-radius: 1.2rem
    transition: background-color 0.3s ease
    &.primary
        background-color: $color-violet-100
        color: $color-white
        &:deep(.loader)
            fill: $color-white
        &:disabled
            background-color: $color-violet-60
        &:not(:disabled)
            @media(any-hover:hover)
                &:hover
                    background-color: $color-violet-130
    &.secondary
        background-color: $color-gray
        color: $color-black
        &:deep(.loader)
            fill: $color-violet-100
        &:disabled
            background-color: $color-gray
        &:not(:disabled)
            @media(any-hover:hover)
                &:hover
                    background-color: $color-gray-100
    &.negative
        background-color: $color-red-10
        color: $color-red-dark
        &:deep(.loader)
            fill: $color-red-dark
        &:disabled
            background-color: $color-red-10
            color: $color-red-light
        &:not(:disabled)
            @media(any-hover:hover)
                &:hover
                    background-color: $color-red-20
</style>