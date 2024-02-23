<template lang="pug">
    .pagination
        .info
            .title Общее количество: 
                span.count 561
            .title Показано на странице: 
                span.count 50
        .navigation
            ul.items
                li.item.active 1
                li.item 2
                li.item 3
                li.item 4
                li.item 5
                li.item 6
                li.item 7
                li.item ...
                li.item 12
            button.next
                span Дальше
                inline-svg.icon(src="/icons/chevron.svg")
</template>

<script>
export default {
    name: 'AppPagination',
};
</script>

<style lang="sass" scoped>
.pagination
    position: relative
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0.8rem 3.2rem
    background-color: $color-gray-light-2
    &::after
        content: ''
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 0.1rem
        background-color: $color-gray-100
    .info
        display: flex
        gap: 4rem
        .title
            font-size: 1.2rem
            line-height: 1.8rem
        .count
            color: $color-gray-dark
    .navigation
        display: flex
        align-items: center
        gap: 1.2rem
        .items
            display: flex
            align-items: center
            gap: 0.2rem
        .item
            display: flex
            align-items: center
            justify-content: center
            font-size: 1.2rem
            line-height: 1.8rem
            height: 2.8rem
            width: 2.8rem
            border-radius: 0.8rem
            cursor: pointer
            transition: background-color 0.3s ease
            @media(any-hover:hover)
                &:hover
                    background-color: $color-gray-100
            &.active
                color: $color-white
                background-color: $color-violet-100
        .next
            display: flex
            align-items: center
            font-size: 1.2rem
            line-height: 1.8rem
            padding: 0.5rem 0.2rem 0.5rem 0.8rem
            border-radius: 0.8rem
            transition: background-color 0.3s ease
            @media(any-hover:hover)
                &:hover
                    background-color: $color-gray-100
            .icon
                width: 2rem
                height: 2rem
</style>