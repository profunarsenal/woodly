<template lang="pug">
    .tabs
        .tab(
            v-for="tab in tabs"
            :key="tab.id"
            :class="setActiveClass(tab.id)"
            @click="setActiveTab(tab.id)"
        )
            .text {{ tab.value }}
</template>

<script>
export default {
    name: 'VTabs',

    props: {
        tabs: {
            type: Array,
            default: () => [],
        },

        modelValue: {
            type: Number,
            default: 0,
        },
    },

    methods: {
        setActiveClass(id) {
            return { active: this.modelValue === id };
        },

        setActiveTab(id) {
            this.$emit('update:modelValue', id)
        },
    },
};
</script>

<style lang="sass" scoped>
.tabs
    display: flex
    align-items: center
    justify-content: space-between
    gap: 0.4rem
    border-radius: 1.2rem
    padding: 0.3rem
    height: 5rem
    background-color: $color-gray-light
    .tab
        position: relative
        display: flex
        align-items: center
        justify-content: center
        flex: 1
        height: 4.4rem
        border-radius: 1rem
        cursor: pointer
        @media(any-hover:hover)
            &:hover
                .text
                    color: $color-black
        &::after
            content: ''
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            background-color: red
            border-radius: 1rem
            background-color: $color-white
            color: $color-black
            transform: scale(0)
            transition: transform 0.1s ease
        &.active
            &::after
                transform: scale(1)
        .text
            position: relative
            z-index: 2
            font-size: 1.4rem
            line-height: 200
            font-weight: 500
            color: $color-gray-dark
            transition: color 0.3s ease
</style>