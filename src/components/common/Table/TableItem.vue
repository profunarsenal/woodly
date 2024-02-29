<template lang="pug">
    tr.tbody-row
        td.tbody-item(
            v-for="header in headers"
            :key="header.key"
        )
            slot(:name="header.key")
                .title {{ item[header.key] }}

        slot(name="tbody")
</template>

<script>
export default {
    name: 'TableItem',

    props: {
        item: {
            type: Object,
            default: () => ({}),
        },
        headers: {
            type: Array,
            defaul: () => [],
        },
    },
};
</script>