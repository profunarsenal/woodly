<template lang="pug">
    .profile
        app-sidebar.sidebar(:items="sidebarItems")
        .content
            router-view
</template>

<script>
import { mapGetters } from 'vuex';
import AppSidebar from '@/components/Sidebar/AppSidebar.vue';
import { USER_PAGES } from '@/helpers/constants';

export default {
    name: 'ProfileLayout',

    components: {
        AppSidebar,
    },

    computed: {
        ...mapGetters({
            hasUser: 'auth/hasUser',
            role: 'auth/role',
        }),

        sidebarItems() {
            return USER_PAGES[this.role] || [];
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
    height: 100vh
    background-color: $color-violet-100
    overflow: hidden
    .content
        margin-left: 22rem
        height: 100%
    .sidebar
        position: fixed
        top: 0
        left: 0
        z-index: 50
        height: 100%
</style>