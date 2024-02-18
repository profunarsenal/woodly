<template lang="pug">
    .input-wrapper
        .label {{ label }}
        input.input(
            :value="modelValue"
            :type="type"
            :placeholder="placeholder"
            @input="input"
            :disabled="isDisabled"
        )
</template>

<script>
export default {
    name: 'VInput',

    emits: ['update:modelValue'],

    props: {
        modelValue: {
            type: [String, Number],
            default: '',
        },

        type: {
            type: String,
            default: 'text',
        },

        label: {
            type: String,
            default: '',
        },

        placeholder: {
            type: String,
            default: '',
        },

        isDisabled: {
            type: Boolean,
            default: false,
        },
    },

    methods: {
        input(event) {
            this.$emit('update:modelValue', event.target.value);
        },
    },
};
</script>

<style lang="sass" scoped>
.input-wrapper
    display: flex
    flex-direction: column
    gap: 0.6rem
    .label
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
    .input
        padding: 1.2rem
        background-color: $color-gray-light
        border-radius: 1.2rem
        height: 4.8rem
        &::placeholder
            font-size: 1.6rem
            color: $color-gray-dark
        &:not(:disabled)
            &:hover
                border: 0.1rem solid $color-gray-100
            &:focus,
            &:active
                border: 0.1rem solid $color-violet-100
        &:disabled
            color: $color-silver-light
            &::placeholder
                color: $color-silver-light
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button
            -webkit-appearance: none
            margin: 0
</style>