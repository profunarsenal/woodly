<template lang="pug">
    table.table(cellspacing="0")
        table-header(:headers="headers")
            template(#thead)
                slot(name="thead")
        tbody.tbody
            table-item(
                v-for="(item, index) in items"
                :key="index"
                :item="item"
                :headers="headers"
            )
                template(
                    v-for="header in headers"
                    :key="header.key"
                    v-slot:[header.key]
                )
                    slot(
                        :name="header.key"
                        :item="item"
                    )
                template(#tbody)
                    slot(
                        name="tbody"
                        :item="item"
                    )
</template>

<script>
import TableHeader from '@/components/common/Table/TableHeader.vue';
import TableItem from '@/components/common/Table/TableItem.vue';

export default {
    name: 'VTable',

    components: {
        TableHeader,
        TableItem,
    },

    props: {
        headers: {
            type: Array,
            defaul: () => [],
        },
        items: {
            type: Array,
            defaul: () => [],
        },
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

<style lang="sass" scoped>
.table
    width: 100%
    border: none
    border-collapse: separate
</style>