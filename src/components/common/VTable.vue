<template lang="pug">
    .wrapper
        table.table(
            v-if="items.length || isSearch"
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
                        @clear="clearSearch(item.key)"
                    )
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
            v-if="!items.length && isSearch"
            imageSrc="/images/empty/search.png"
            title="Ничего не нашлось"
            subtitle="Попробуйте изменить свой запрос"
        )
</template>

<script>
import TableHeader from '@/components/common/Table/TableHeader.vue';
import TableItem from '@/components/common/Table/TableItem.vue';
import TableSearch from '@/components/common/Table/TableSearch.vue';
import EmptyForm from '@/components/app/EmptyForm.vue';

export default {
    name: 'VTable',

    components: {
        TableHeader,
        TableItem,
        TableSearch,
        EmptyForm,
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

        clearSearch(key) {
            const urlParams = Object.assign({}, this.$route.query);
            delete urlParams[key];
            this.$router.push({ query: urlParams });
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
</style>