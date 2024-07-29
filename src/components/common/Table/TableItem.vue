<template lang="pug">
    .tbody-row
        .tbody-item(
            v-for="header in headers"
            :key="header.key"
            :class="`table-item-${header.key}`"
        )
            slot(:name="header.key")
                .tbody-title {{ item[header.key] }}

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