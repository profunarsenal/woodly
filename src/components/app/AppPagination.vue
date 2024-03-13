<template lang="pug">
    .pagination
        .info
            .title Общее количество: 
                span.count {{ total }}
            .title Показано на странице: 
                span.count {{ count }}
        .navigation
            ul.items
                li.item(
                    v-for="page in pagesList"
                    :key="page"
                    :class="{ active: activePage === page }"
                    @click="toPage(page)"
                ) {{ page }}
            button.next(
                @click="nextPage"
                :disabled="isLastPage"
            )
                span Дальше
                inline-svg.icon(src="/icons/chevron.svg")
</template>

<script>
const DOTS = '...';

export default {
    name: 'AppPagination',

    props: {
        pages: {
            type: Number,
            default: 1,
        },
        total: {
            type: Number,
            default: 1,
        },
        count: {
            type: Number,
            default: 1,
        },
    },

    data() {
        return {
            activePage: 1,
        };
    },

    computed: {
        isLastPage() {
            return this.activePage === this.pages;
        },

        pagesList() {
            const MAX_PAGES_ELEMENTS = 9;
            const VISIBLE_ELEMENTS_FROM_START = 4;
            const VISIBLE_ELEMENTS_FROM_FINISH = 6;
            const FIRST_PAGE_ELEMENT = 1;
            const COUNT_EDGE_ELEMENTS = 2;

            if (this.pages <= MAX_PAGES_ELEMENTS) {
                return this.pages;
            }

            const countPagesToEnd = this.pages - this.activePage;
            const pagesList = [];

            if (this.activePage <= VISIBLE_ELEMENTS_FROM_START) {
                for (let item = FIRST_PAGE_ELEMENT; item <= VISIBLE_ELEMENTS_FROM_FINISH + 1; item++) {
                    pagesList.push(item)
                }

                pagesList.push(DOTS);
                pagesList.push(this.pages);

                return pagesList;
            }

            if (this.activePage > VISIBLE_ELEMENTS_FROM_START && countPagesToEnd > VISIBLE_ELEMENTS_FROM_FINISH) {
                pagesList.push(FIRST_PAGE_ELEMENT);
                pagesList.push(DOTS);

                for (let item = this.activePage - COUNT_EDGE_ELEMENTS; item <= this.activePage + COUNT_EDGE_ELEMENTS; item++) {
                    pagesList.push(item)
                }

                pagesList.push(DOTS);
                pagesList.push(this.pages);

                return pagesList;
            }

            if (countPagesToEnd <= VISIBLE_ELEMENTS_FROM_FINISH) {
                pagesList.push(FIRST_PAGE_ELEMENT);
                pagesList.push(DOTS);

                for (let item = this.pages - VISIBLE_ELEMENTS_FROM_FINISH; item <= this.pages; item++) {
                    pagesList.push(item)
                }

                return pagesList;
            }

            return MAX_PAGES_ELEMENTS;
        },
    },

    methods: {
        toPage(page) {
            if (page === DOTS) {
                return;
            }

            this.activePage = page;
        },

        nextPage() {
            if (this.pages === this.activePage) {
                return;
            }

            this.activePage = this.activePage + 1;
        },
    },
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
            background-color: $color-gray-light-2
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
            &:not(:disabled)
                @media(any-hover:hover)
                    &:hover
                        background-color: $color-gray-100
            &:disabled
                color: $color-gray-dark
                .icon
                    fill: $color-gray-dark
            .icon
                width: 1.8rem
                height: 1.8rem
</style>