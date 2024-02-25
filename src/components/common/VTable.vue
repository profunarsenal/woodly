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
                    table-search(
                        v-if="headItem.searchable"
                        v-model="searchFields[headItem.key]"
                        :item="headItem"
                    )
                    slot(
                        v-else
                        :name="`column-${headItem.key}`"
                        :item="headItem"
                    )
                        .content
                            .title {{ headItem.title }}
                            .subtitle(v-if="headItem.subtitle") {{ headItem.subtitle }}

                slot(name="head")
        tbody.body
            tr.body-row(
                v-for="(bodyItem, bodyItemIndex) in bodyItems"
                :key="bodyItemIndex"
            )
                td.body-item(
                    v-for="(item, index)  in Object.entries(bodyItem)"
                    :key="index"
                )
                    slot(
                        :name="item[0]"
                        :item="getTableItem(item)"
                    )
                        .title {{ item[1] }}

                slot(
                    name="body"
                    :item="bodyItem"
                )
</template>

<script>
import TableSearch from '@/components/Table/TableSearch.vue';

export default {
    name: 'VTable',

    components: {
        TableSearch,
    },

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

    data() {
        return {
            searchFields: {},
        };
    },

    methods: {
        getTableItem(item) {
            return {
                [item[0]]: item[1],
            };
        },
    },
};
</script>

<style lang="sass">
.table
    width: 100%
    border: none
    border-collapse: separate
    .head-row
        position: sticky
        z-index: 10
        top: 0
        left: 0
        .head-item
            position: relative
            text-align: left
            border: none
            padding: 1rem 1.2rem
            background-color: $color-gray-light-2
            border: 0.1rem solid $color-gray-100
            .content
                display: flex
                align-items: center
                gap: 0.6rem
                .title
                    font-weight: 500
                    font-size: 1.4rem
                    line-height: 2rem
                .subtitle
                    font-weight: 400
                    font-size: 1.2rem
                    line-height: 1.8rem
                    color: $color-gray-dark
                    align-self: flex-end
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