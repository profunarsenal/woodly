<template lang="pug">
    table.table(
        cellspacing="0"
    )
        thead.head
            tr.head-row
                th.head-item(
                    v-for="headItem in headItems"
                    :key="headItem.key"
                )
                    .search(v-if="headItem.searchable")
                        .title {{ headItem.title }}
                        button.search
                            inline-svg.icon(src="/icons/search.svg")
                        input.field
                    slot(
                        v-else
                        :v-slot="headItem.key"
                    )
                        .title {{ headItem.title }}
        tbody.body
            tr.body-row(
                v-for="(bodyItem, bodyItemIndex) in bodyItems"
                :key="bodyItemIndex"
            )
                td.body-item(
                    v-for="(item, index)  in Object.entries(bodyItem)"
                    :key="index"
                )
                    slot(:v-slot="`${item[0]}-value`")
                        .title {{ item[1] }}
</template>

<script>
export default {
    name: 'VTable',

    props: {
        headItems: {
            type: Array,
            defaul: () => [],
        },
        bodyItems: {
            type: Array,
            defaul: () => [],
        },
    },
};
</script>

<style lang="sass" scoped>
.table
    width: 100%
    border: none
    border-collapse: separate
    overflow: hidden
    .head-row
        .head-item
            position: relative
            text-align: left
            border: none
            padding: 1rem 1.2rem
            font-weight: 500
            font-size: 1.4rem
            line-height: 2rem
            background-color: $color-gray-light-2
            border: 0.1rem solid $color-gray-100
            .search
                display: flex
                align-items: center
                gap: 1.2rem
                cursor: pointer
                @media(any-hover:hover)
                &:hover
                    .icon
                       fill: $color-gray-dark
                .icon
                    width: 2rem
                    height: 2rem
                    fill: $color-silver
                    transition: fill 0.3s ease
                .field
                    position: absolute
                    top: 0
                    left: 0
                    height: 100%
                    width: 22.2rem
                    box-shadow: 0.6rem 0.6rem 1.6rem 0 rgba(0, 0, 0, 0.12)
    .body-row
        .body-item
            font-size: 1.4rem
            line-height: 2rem
            padding: 0.8rem 1.2rem
            border: 0.1rem solid $color-gray-100

.head-row:first-child .head-item:first-child
  border-top-left-radius: 1rem

.head-row:first-child .head-item:last-child
  border-top-right-radius: 1rem

.body-row:last-child .body-item:first-child
  border-bottom-left-radius: 1rem

.body-row:last-child .body-item:last-child
  border-bottom-right-radius: 1rem

</style>