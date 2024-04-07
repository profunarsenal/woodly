<template lang="pug">
    button.button(
        :class="[type, size]"
        :disabled="isLoading || isDisabled"
        @click="$emit('click')"
    )
        v-loader(v-if="isLoading")
        template(v-else)
            slot
            inline-svg.icon(
                v-if="iconSrc"
                :src="iconSrc"
            )
</template>

<script>
import VLoader from '@/components/common/VLoader.vue';

export default {
    name: 'VButton',

    emits: ['click'],

    components: {
        VLoader,
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

        iconSrc: {
            type: String,
            default: '',
        },

        size: {
            type: String,
            default: 'medium',
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
    font-size: 1.4rem
    font-weight: 500
    line-height: 2rem
    border-radius: 1.2rem
    transition: background-color 0.3s ease
    .icon
        width: 2rem
        height: 2rem
    &.medium
        height: 4.4rem
    &.small
        height: 4rem
        .icon
            width: 1.6rem
            height: 1.6rem
    &.mini
        height: 3.4rem
        font-size: 1.2rem
        line-height: 1.8rem
    &.primary
        background-color: $color-violet-100
        color: $color-white
        .icon
            fill: $color-white
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
            color: $color-gray-dark
            .icon
                fill: $color-gray-dark
        &:not(:disabled)
            @media(any-hover:hover)
                &:hover
                    background-color: $color-gray-100
    &.negative
        background-color: $color-red-10
        color: $color-red-dark
        .icon
            fill: $color-red-dark
        &:deep(.loader)
            fill: $color-red-dark
        &:disabled
            background-color: $color-red-10
            color: $color-red-light
        &:not(:disabled)
            @media(any-hover:hover)
                &:hover
                    background-color: $color-red-20
    &.outline
        border: 0.1rem solid $color-gray-100
        .icon
            fill: $color-gray-dark
        &:disabled
            color: $color-gray-dark
        &:not(:disabled)
            @media(any-hover:hover)
                &:hover
                    background-color: $color-gray-light
    &.positive
        color: $color-green
        background-color: rgba($color-green, 0.15)
        .icon
            fill: $color-green
        &:deep(.loader)
            fill: $color-green
        &:disabled
            color: rgba($color-green, 0.6)
            .icon
                fill: rgba($color-green, 0.6)
        &:not(:disabled)
            @media(any-hover:hover)
                &:hover
                    background-color: rgba($color-green, 0.25)

</style>