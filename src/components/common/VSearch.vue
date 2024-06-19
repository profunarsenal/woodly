<template lang="pug">
    .search(
        v-click-outside="clickOutside"
        :class="searchClasses"
    )
        inline-svg.icon.icon-close(
            v-if="isFocused || modelValue"
            src="/icons/close.svg"
            @click.stop="clearValue"
        )
        inline-svg.icon.icon-search(
            v-else
            src="/icons/search.svg"
        )
        inline-svg.icon.icon-filter(src="/icons/filter.svg")
        input.field(
            :value="modelValue"
            :placeholder="$lang.search"
            @focus="focus"
            @input="input"
        )
</template>

<script>
export default {
    name: 'VSearch',

    emits: ['update:modelValue'],

    props: {
        modelValue: {
            type: [String, Number],
            default: '',
        },
    },

    data() {
        return {
            isFocused: false,
        };
    },

    computed: {
        searchClasses() {
            return {
                focused: this.isFocused,
            };
        },
    },

    methods: {
        focus() {
            this.isFocused = true;
        },

        clickOutside() {
            this.isFocused = false;
        },

        input(event) {
            this.$emit('update:modelValue', event.target.value);
        },

        clearValue() {
            this.$emit('update:modelValue', '');
        },
    },
};
</script>

<style lang="sass" scoped>
.hover-icon
    cursor: pointer
    transition: 0.3s ease
    @media(any-hover:hover)
    &:hover
        fill: $color-violet-100

.search
    position: relative
    width: 25rem
    padding: 0.4rem
    height: 4rem
    border-radius: 1rem
    border: 0.1rem solid $color-gray-100
    transition: 0.3s ease
    @media(any-hover:hover)
        &:hover
            background-color: $color-gray-light
    &.focused
        border: 0.1rem solid $color-violet-100
        background-color: $color-gray-light

.icon
    position: absolute
    top: 1.2rem
    width: 1.6rem
    height: 1.6rem
    fill: $color-gray-dark

.icon-search
    left: 1.2rem

.icon-filter
    right: 1.2rem
    @extend .hover-icon

.icon-close
    left: 1.2rem
    @extend .hover-icon

.field
    width: 100%
    padding: 0.6rem 3.2rem
    font-size: 1.4rem
    line-height: 2rem
    font-weight: 500
    background-color: inherit
    &::placeholder
        color: $color-silver-light
</style>