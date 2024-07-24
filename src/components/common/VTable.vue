<template lang="pug">
    .loader(v-if="isLoading")
        v-loader(size="big")
    .wrapper(v-else)
        table.table(
            v-if="items.length || (isSearch || isActiveFilters)"
            cellspacing="0"
        )
            table-header(:headers="headers")
                template(#thead)
                    slot(name="thead")
                template(
                    v-for="item in headerSlotsKeys"
                    :key="item.headerKey"
                    v-slot:[item.headerKey]
                )
                    table-search(
                        v-if="item.searchable"
                        v-model="searchableFields[item.key]"
                        :item="item"
                        @input="search($event, item.key)"
                    )
                    table-filter(
                        v-else-if="item.filterable"
                        :item="item"
                    )
                        template(#filter)
                            slot(:name="`filter-${item.key}`")
                    slot(
                        v-else
                        :name="item.headerKey"
                        :item="item"
                    )
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
        slot(
            v-if="!items.length && !isSearch"
            name="empty"
        )
        empty-form(
            v-if="!items.length && (isSearch || isActiveFilters)"
            imageSrc="/images/empty/search.png"
            :title="$lang.nothingFound"
            :subtitle="$lang.tryChangingYourQuery"
        )
</template>

<script>
import VLoader from '@//components/common/VLoader.vue';
import TableHeader from '@/components/common/Table/TableHeader.vue';
import TableItem from '@/components/common/Table/TableItem.vue';
import TableSearch from '@/components/common/Table/TableSearch.vue';
import TableFilter from '@/components/common/Table/TableFilter.vue';
import EmptyForm from '@/components/Profile/EmptyForm.vue';

export default {
    name: 'VTable',

    components: {
        TableHeader,
        TableItem,
        TableSearch,
        TableFilter,
        EmptyForm,
        VLoader,
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

        isLoading: {
            type: Boolean,
            default: false,
        },

        isActiveFilters: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            searchableFields: {},
        };
    },

    computed: {
        headerSlotsKeys() {
            return this.headers.map((item) => {
                return {
                    ...item,
                    headerKey: `thead-${item.key}`,
                };
            });
        },

        isSearch() {
            return Object.values(this.searchableFields).some(value => value);
        },
    },

    methods: {
        search(event, key) {
            this.$emit('search', event.target.value, key)
        },

        initSearchFields() {
            this.headers.forEach((header) => {
                if (header.searchable) {
                    if (this.$route.query[header.key]) {
                        this.searchableFields[header.key] = this.$route.query[header.key];
                    } else {
                        this.searchableFields[header.key] = '';
                    }
                }
            });
        },
    },

    created() {
        this.initSearchFields();
    },
};
</script>

<style lang="sass" scoped>
.wrapper
    height: 100%

.table
    width: 100%
    border: none
    border-collapse: separate

.loader
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    fill: $color-violet-100
</style>