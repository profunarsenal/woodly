<template lang="pug">
    thead.thead
        tr.thead-row
            th.thead-item(
                v-for="header in headers"
                :key="header.key"
                :style="header.style"
            )
                slot(
                    :name="`thead-${header.key}`"
                    :item="header"
                )
                    .content
                        .title {{ header.title }}
                        .subtitle(v-if="header.subtitle") {{ header.subtitle }}

            slot(name="thead")
</template>

<script>
export default {
    name: 'TableHeader',

    props: {
        headers: {
            type: Array,
            default: () => [],
        },
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