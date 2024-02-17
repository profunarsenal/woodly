<template lang="pug">
    .details
        ul.list
            li.item(
                v-for="item in details"
                :key="item.id"
            )
                inline-svg.icon(:src="item.icon")
                .key {{ item.key }}
                .value {{ item.value }}
</template>

<script>
export default {
    name: 'PaymentDetails',

    props: {
        details: {
            type: Array,
            default: () => [],
        },
    },
}
</script>

<style lang="sass" scoped>
.details
    margin-bottom: 1.6rem
    width: 100%
    padding: 2rem 1.6rem
    border-radius: 1.6rem
    background-color: $color-white
    .list
        display: flex
        flex-direction: column
    .item
        display: flex
        align-items: center
        gap: 1.6rem
        padding: 1.6rem 0
        &:first-child
            padding-top: 0
        &:last-child
            padding-bottom: 0
        &:not(:last-child)
            border-bottom: 0.1rem solid $color-gray-divider
        .icon
            fill: $color-gray-dark
        .key
            color: $color-gray-dark
        .value
            margin-left: auto
            font-weight: 500
</style>