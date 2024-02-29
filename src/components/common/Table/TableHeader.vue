<template lang="pug">
    thead.thead
        tr.thead-row
            th.thead-item(
                v-for="header in headers"
                :key="header.key"
            )
                table-search(
                    v-if="header.searchable"
                    v-model="searchFields[header.key]"
                    :item="header"
                )
                slot(
                    v-else
                    :name="header.key"
                    :item="header"
                )
                    .content
                        .title {{ header.title }}
                        .subtitle(v-if="header.subtitle") {{ header.subtitle }}

            slot(name="thead")
</template>

<script>
import TableSearch from '@/components/common/Table/TableSearch.vue';

export default {
    name: 'TableHeader',

    components: {
        TableSearch,
    },

    props: {
        headers: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            searchFields: {},
        };
    },
};
</script>

<style lang="sass" scoped>
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
</style>