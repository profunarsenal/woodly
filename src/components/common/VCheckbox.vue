<template lang="pug">
    .checkbox(:class="checkboxClasses")
        input.input(
            :value="modelValue"
            :id="id"
            :disabled="isDisabled"
            @change="change"
            type="checkbox"
        )
        label.label(:for="id")
            .box
                inline-svg.icon(src="/icons/checkbox-mark.svg")
            .text {{ label }}
</template>
 
<script>
export default {
    name: 'VCheckbox',

    emits: ['update:modelValue', 'onChange'],

    props: {
        modelValue: {
            type: Boolean,
            default: false,
        },

        id: {
            type: String,
            default: '',
        },

        label: {
            type: String,
            default: '',
        },

        isDisabled: {
            type: Boolean,
            default: false,
        },
    },

    computed: {
        checkboxClasses() {
            return {
                checked: this.modelValue,
                disabled: this.isDisabled,
            };
        },
    },

    methods: {
        change() {
            this.$emit('update:modelValue', !this.modelValue);
            this.$emit('onChange', !this.modelValue);
        },
    },
};
</script>

<style lang="sass" scoped>
.checkbox
    position: relative
    .input
        position: absolute
        width: 0.1rem
        height: 0.1rem
        opacity: 0
        visibility: hidden
        pointer-events: none
    .label
        position: relative
        display: flex
        align-items: center
        gap: 0.8rem
        cursor: pointer
        .text
            font-size: 1.4rem
            line-height: 2rem
            color: $color-black
        .box
            display: flex
            align-items: center
            justify-content: center
            width: 2rem
            height: 2rem
            border: 0.15rem solid $color-gray-100
            background-color: $color-white
            border-radius: 0.6rem
            transition: all 0.3s ease
        .icon
            width: 2rem
            height: 2rem
            fill: $color-white
            transition: all 0.3s ease
        @media(any-hover:hover)
            &:hover
                .box
                    border: 0.15rem solid $color-silver
    &.checked
        .label
            .box
                background-color: $color-violet-100
        &:not(.disabled)
            @media(any-hover:hover)
                &:hover
                    .box
                        background-color: $color-violet-60
    &.disabled
        .label
            .text
                color: $color-gray-dark
            .box
                border: 0.15rem solid $color-silver
        &.checked
            .box
                border: 0.15rem solid $color-silver
                background-color: $color-gray-light
            .icon
                fill: $color-silver
</style>