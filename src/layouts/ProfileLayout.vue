<template lang="pug">
    .profile
        app-sidebar.sidebar(:items="sidebarItems")
        .content
            router-view
            app-footer.footer(v-if="!needHideFooter")
</template>

<script>
import { mapGetters } from 'vuex';
import AppSidebar from '@/components/Sidebar/AppSidebar.vue';
import AppFooter from '@/components/Footer/AppFooter.vue';
import { PROFILE_SIDEBAR_ITEMS } from '@/helpers/constants';

export default {
    name: 'ProfileLayout',

    components: {
        AppSidebar,
        AppFooter,
    },

    data() {
        return {
            sidebarItems: PROFILE_SIDEBAR_ITEMS,
        };
    },

    computed: {
        ...mapGetters({
            isAuth: 'auth/isAuth',
            hasUser: 'auth/hasUser',
        }),

        needHideFooter() {
            return this.$route.meta.needHideFooter ?? false;
        },
    },

    async created() {
        if (!this.hasUser) {
            await this.$store.dispatch('auth/getUser');
        }
    },
};
</script>

<style lang="sass" scoped>
.profile
    display: flex
    height: 100vh
    background-color: $color-violet-100
    overflow: hidden
    .content
        display: flex
        flex-direction: column
        width: 100%
        margin-left: 22rem
        overflow-y: auto
    .sidebar
        position: fixed
        top: 0
        left: 0
        z-index: 50
        height: 100%
    .footer
        position: fixed
        bottom: 0
        right: 0
        width: calc( 100% - 22rem )
        z-index: 50
</style>