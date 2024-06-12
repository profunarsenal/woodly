<template lang="pug">
    .input-wrapper
        .label(v-if="label") {{ label }}
        input.input(
            ref="input"
            :value="modelValue"
            :type="inputType"
            :placeholder="placeholder"
            :disabled="isDisabled"
            :autocomplete="autocomplete"
            @input="input"
        )
        inline-svg.icon-password(
            v-if="isPassword"
            :src="iconPassword"
            @click.stop="togglePasswordVisible"
        )
</template>

<script>
const TYPE_PASSWORD = 'password';
const TYPE_TEXT = 'text';

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

        isPassword: {
            type: Boolean,
            default: false,
        },

        autocomplete: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            inputType: this.type,
            isPasswordVisible: false,
        };
    },

    computed: {
        iconPassword() {
            return this.isPasswordVisible ? '/icons/eye-hide.svg' : '/icons/eye.svg';
        },
    },

    methods: {
        input(event) {
            this.$emit('update:modelValue', event.target.value);
        },

        togglePasswordVisible() {
            this.isPasswordVisible = !this.isPasswordVisible;
            this.inputType = this.isPasswordVisible ? TYPE_TEXT : TYPE_PASSWORD;
        },
    },
};
</script>

<style lang="sass" scoped>
.input-wrapper
    position: relative
    display: flex
    flex-direction: column
    gap: 0.6rem
    .label
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
    .icon-password
        position: absolute
        bottom: 1.4rem
        right: 1.2rem
        fill: $color-silver
        cursor: pointer
    .input
        padding: 1.2rem
        background-color: $color-gray-light
        border-radius: 1.2rem
        height: 4.8rem
        font-size: 1.6rem
        line-height: 2.4rem
        border: 0.1rem solid $color-gray-light
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