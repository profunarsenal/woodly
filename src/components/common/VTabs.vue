<template lang="pug">
    .tabs
        .tab(
            v-for="tab in tabs"
            :key="tab.key"
            :class="[tab.color, tab.key, { selected: modelValue === tab.key }]"
            @click="selectTab(tab.key)"
        )
            .text {{ tab.title }}
            inline-svg.icon(
                v-if="tab.icon"
                :src="tab.icon"
            )
</template>

<script>
export default {
    name: 'VTabs',

    emits: ['update:modelValue', 'select'],

    props: {
        tabs: {
            type: Array,
            required: true,
        },

        modelValue: {
            type: [String, Number],
            default: '',
        },
    },

    methods: {
        selectTab(key) {
            this.$emit('update:modelValue', key);
            this.$emit('select');
        },
    },
};
</script>

<style lang="sass" scoped>
.tabs
    display: flex
    flex-wrap: wrap
    gap: 0.6rem
    align-items: center
    .tab
        display: flex
        align-items: center
        gap: 0.8rem
        padding: 0.8rem 1.6rem
        height: 3.4rem
        background-color: $color-white
        border-radius: 1rem
        border: 0.1rem solid $color-gray-100
        transition: all 0.3s ease
        cursor: pointer
        &.yellow
            .icon
                fill: $color-yellow-dark
        &.red
            .icon
                fill: $color-red-dark
        &.green
            .icon
                fill: $color-green
        &.selected
            border: 0.1rem solid rgba($color-violet-100, 0.1)
            background-color: rgba($color-violet-100, 0.1)
            &.yellow
                border: 0.1rem solid rgba($color-yellow-dark, 0.2)
                background-color: rgba($color-yellow-dark, 0.1)
            &.red
                border: 0.1rem solid rgba($color-red-dark, 0.15)
                background-color: rgba($color-red-dark, 0.16)
            &.green
                border: 0.1rem solid rgba($color-green, 0.2)
                background-color: rgba($color-green, 0.15)
        @media(any-hover:hover)
            &:hover
                background-color: $color-gray-light-2
        .text
            font-weight: 500
            font-size: 1.2rem
            line-height: 1.8rem
        .icon
            width: 1.6rem
            height: 1.6rem
            fill: $color-violet-100
</style>