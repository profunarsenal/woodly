<template lang="pug">
    .search(
        @click="openSearch"
        v-click-outside="closeSearch"
    )
        .title {{ item.title }}
        inline-svg.icon-search(src="/icons/search.svg")
        .search-field(v-if="isOpen")
            input.field(
                :value="modelValue"
                :id="item.key"
                :placeholder="item.title"
                type="text"
                @input="input"
            )
            inline-svg.icon-close(
                @click.stop="closeSearch"
                src="/icons/close.svg"
            )
</template>

<script>
export default {
    name: 'TableSearch',

    props: {
        modelValue: {
            type: [String, Number],
            default: '',
        },

        item: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            isOpen: false,
        };
    },

    methods: {
        openSearch() {
            this.isOpen = true;
        },

        closeSearch() {
            this.isOpen = false;
        },

        input(event) {
            this.$emit('update:modelValue', event.target.value);
        },
    },
};
</script>

<style lang="sass" scoped>
.search
    display: flex
    align-items: center
    justify-content: space-between
    gap: 1.2rem
    cursor: pointer
    @media(any-hover:hover)
    &:hover
        .icon-search
            fill: $color-gray-dark
    .title
        font-weight: 500
        font-size: 1.4rem
        line-height: 2rem
    .icon-search,
    .icon-close
        width: 2rem
        height: 2rem
        transition: fill 0.3s ease
    .icon-search
        fill: $color-silver
    .icon-close
        fill: $color-silver
        @media(any-hover:hover)
            &:hover
                fill: $color-gray-dark
    .search-field
        position: absolute
        top: 0
        left: 0
        z-index: 11
        height: 100%
        min-width: 22.2rem
        width: 100%
        box-shadow: 0.6rem 0.6rem 1.6rem 0 rgba(0, 0, 0, 0.12)
        display: flex
        align-items: center
        gap: 1.2rem
        background-color: $color-white
        padding: 1rem 1rem 1rem 1.2rem
        .field
            width: 100%
            height: 100%
            font-size: 1.4rem
            font-weight: 500
            line-height: 2rem
            &::placeholder
                color: $color-silver-light
</style>