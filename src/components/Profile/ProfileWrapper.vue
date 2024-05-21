<template lang="pug">
    .profile-wrapper
        .header
            .title(v-if="title") {{ title }}
            slot(name="header")

        .loader(v-if="isLoading")
            v-loader(size="big")
        template(v-else)
            .content
                slot(name="content")

            app-pagination.pagination(
                v-if="pagination.pages > 1"
                :pages="pagination.pages"
                :limit="pagination.limit"
                :total="pagination.total"
                :count="items.length"
            )
        slot(name="footer")
            app-footer.footer
</template>

<script>
import AppPagination from '@/components/app/AppPagination.vue';
import AppFooter from '@/components/Footer/AppFooter.vue';
import VLoader from '@//components/common/VLoader.vue';

export default {
    name: 'ProfileWrapper',

    components: {
        AppPagination,
        AppFooter,
        VLoader,
    },

    props: {
        title: {
            type: String,
            default: '',
        },

        pagination: {
            type: Object,
            default: () => ({}),
        },

        items: {
            type: Array,
            default: () => [],
        },

        isLoading: {
            type: Boolean,
            default: false,
        },
    },
};
</script>

<style lang="sass" scoped>
.profile-wrapper
    display: flex
    flex-direction: column
    margin-top: 0.8rem
    padding: 2.4rem 3.2rem 9.8rem 3.2rem
    background-color: $color-white
    border-radius: 2rem 0 0 0
    width: 100%
    flex: 1 1 auto

.header
    display: flex
    align-items: center
    justify-content: flex-start
    gap: 1.6rem
    margin-bottom: 3.2rem
    .title
        font-weight: 600
        font-size: 3.2rem
        line-height: 3.2rem

.pagination
    position: fixed
    bottom: 3.8rem
    right: 0
    width: calc( 100% - 22rem )
    z-index: 50

.loader
    display: flex
    align-items: center
    justify-content: center
    height: 100%
    fill: $color-violet-100

.footer
    position: fixed
    bottom: 0
    right: 0
    width: calc( 100% - 22rem )
    z-index: 50
</style>