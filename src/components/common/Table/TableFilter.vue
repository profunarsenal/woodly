<template lang="pug">
    .filter
        .title {{ item.title }}
        button.filter-button(
            @click="openFilter"
            v-click-outside="closeFilter"
        )
            inline-svg.filter-icon(src="/icons/filter-section.svg")
            slot(
                v-if="isOpenFilter"
                name="filter"
            )
</template>

<script>
export default {
    name: 'TableFilter',

    props: {
        item: {
            type: Object,
            required: true,
        },
    },

    data() {
        return {
            isOpenFilter: false,
        };
    },

    methods: {
        openFilter() {
            this.isOpenFilter = true;
        },

        closeFilter() {
            this.isOpenFilter = false;
        },
    },
};
</script>

<style lang="sass" scoped>
.filter
    display: flex
    align-items: center
    justify-content: space-between
    gap: 1.2rem

.title
    font-weight: 500
    font-size: 1.4rem
    line-height: 2rem

.filter-button
    width: 2rem
    height: 2rem
    @media(any-hover:hover)
        &:hover
            .icon
                fill: $color-gray-dark
.filter-icon
    width: 100%
    height: 100%
    fill: $color-silver
    transition: fill 0.3s ease
</style>