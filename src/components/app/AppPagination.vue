<template lang="pug">
    .pagination
        .info
            .title {{ $lang.pagination.total }}
                span.count {{ total }}
            .title {{ $lang.pagination.shownOnPage }}
                span.count {{ count }}
        .navigation
            ul.items
                li.item(
                    v-for="item in pagesList"
                    :key="item"
                    :class="setClass(item)"
                    @click="toPage(item)"
                ) {{ item }}
            button.next(
                @click="nextPage"
                :disabled="isLastPage"
            )
                span {{ $lang.pagination.further }}
                inline-svg.icon(src="/icons/chevron.svg")
</template>

<script>
const DOTS = '...';

export default {
    name: 'AppPagination',

    props: {
        total: {
            type: Number,
            default: 1,
        },
        limit: {
            type: Number,
            default: 16,
        },
        count: {
            type: Number,
            default: 1,
        },
        pages: {
            type: Number,
            default: 1,
        },
    },

    data() {
        return {
            page: +this.$route.query?.page || 1,
            urlParams: Object.assign({}, this.$route.query),
        };
    },

    computed: {
        isLastPage() {
            return this.page === this.pages;
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

            const countPagesToEnd = this.pages - this.page;
            const pagesList = [];

            if (this.page <= VISIBLE_ELEMENTS_FROM_START) {
                for (let item = FIRST_PAGE_ELEMENT; item <= VISIBLE_ELEMENTS_FROM_FINISH + 1; item++) {
                    pagesList.push(item)
                }

                pagesList.push(DOTS);
                pagesList.push(this.pages);

                return pagesList;
            }

            if (this.page > VISIBLE_ELEMENTS_FROM_START && countPagesToEnd > VISIBLE_ELEMENTS_FROM_FINISH) {
                pagesList.push(FIRST_PAGE_ELEMENT);
                pagesList.push(DOTS);

                for (let item = this.page - COUNT_EDGE_ELEMENTS; item <= this.page + COUNT_EDGE_ELEMENTS; item++) {
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

    watch: {
        page(newValue) {
            const FIRST_PAGE = 1;

            if (this.page === FIRST_PAGE) {
                delete this.urlParams.page;
            } else {
                this.urlParams.page = newValue;
            }

            this.$router.push({ query: this.urlParams });
        },
    },

    methods: {
        toPage(page) {
            if (page === DOTS) {
                return;
            }

            this.page = page;
        },

        nextPage() {
            if (this.page === this.pages) {
                return;
            }

            this.page = this.page + 1;
        },

        setClass(item) {
            return {
                active: item === this.page,
                dots: item === DOTS,
            };
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
            background-color: $color-gray-light-2
            &:not(.dots, .active)
                cursor: pointer
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