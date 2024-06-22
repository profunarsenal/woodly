<template lang="pug">
    .list
        .item(
            v-for="key in keys"
            :key="key.key"
        )
            .key {{ key.title }}
            .value
                slot(
                    :name="key.key"
                    :item="item"
                )
                    span {{ item[key.key] }}
</template>

<script>
export default {
    name: 'TableList',

    props: {
        keys: {
            type: Array,
            default: () => [],
        },

        item: {
            type: Object,
            default: () => ({}),
        },
    },
};
</script>

<style lang="sass" scoped>
$border-table: 0.1rem solid $color-gray-100

.item
    display: flex
    border-bottom: $border-table
    border-left: $border-table
    border-right: $border-table
    &:first-child
        border-top: $border-table
        border-radius: 1.2rem 1.2rem 0 0
    &:last-child
        border-radius: 0 0 1.2rem 1.2rem

.key,
.value
    flex: 1
    padding: 0.8rem 1.2rem
    font-size: 1.2rem
    line-height: 1.8rem

.key
    font-weight: 500
    border-right: $border-table
</style>