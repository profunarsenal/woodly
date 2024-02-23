<template lang="pug">
    .profile
        app-sidebar(:items="sidebarItems")
        .content
            router-view
            app-footer
</template>

<script>
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
};
</script>

<style lang="sass" scoped>
.profile
    display: flex
    height: 100vh
    background-color: $color-violet-100
    .content
        display: flex
        flex-direction: column
        width: 100%
</style>