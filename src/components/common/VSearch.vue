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

        button.filters-button(@click="toggleFilters")
            .counter(v-if="filtersCount")
                span {{ filtersCount }}
            inline-svg.icon-filter(src="/icons/filter.svg")
        
        .filters-wrapper
            slot(
                v-if="isOpened"
                name="filters"
            )

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

        filtersCount: {
            type: Number,
            default: 0,
        },
    },

    data() {
        return {
            isFocused: false,
            isOpened: false,
        };
    },

    computed: {
        searchClasses() {
            return {
                focused: this.isFocused,
                opened: this.isOpened || this.filtersCount,
            };
        },
    },

    methods: {
        focus() {
            this.isFocused = true;
        },

        clickOutside() {
            this.isFocused = false;
            this.isOpened = false;
        },

        input(event) {
            this.$emit('update:modelValue', event.target.value);
        },

        clearValue() {
            this.$emit('update:modelValue', '');
        },

        toggleFilters() {
            this.isOpened = !this.isOpened;
        },
    },
};
</script>

<style lang="sass" scoped>
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
    &.opened
        .filters-button
            background-color: rgba($color-violet-100, 0.1)
            @media(any-hover:hover)
                &:hover
                    background-color: rgba($color-violet-100, 0.16)
        .icon-filter
            fill: $color-violet-100

.filters-wrapper
    position: absolute
    top: 0
    right: 0

.filters-button
    position: absolute
    top: 0.4rem
    right: 0.4rem
    width: 3.2rem
    height: 3.2rem
    border-radius: 0.6rem
    display: flex
    align-items: center
    justify-content: center
    @media(any-hover:hover)
        &:hover
            .icon-filter
                fill: $color-violet-100

.icon-filter
    pointer-events: none
    width: 1.6rem
    height: 1.6rem
    fill: $color-gray-dark
    transition: 0.3s ease

.counter
    position: absolute
    top: 0
    right: 0
    width: 1.2rem
    height: 1.2rem
    font-weight: 600
    font-size: 0.8rem
    line-height: 1rem
    border-radius: 50%
    color: $color-white
    background-color: $color-violet-100
    display: flex
    align-items: center
    justify-content: center

.icon
    position: absolute
    top: 1.2rem
    width: 1.6rem
    height: 1.6rem
    fill: $color-gray-dark

.icon-search
    left: 1.2rem

.icon-close
    left: 1.2rem
    cursor: pointer
    transition: 0.3s ease
    @media(any-hover:hover)
    &:hover
        fill: $color-violet-100

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