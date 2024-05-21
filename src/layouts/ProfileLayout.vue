<template lang="pug">
    .profile
        app-sidebar.sidebar(:items="sidebarItems")
        .content
            router-view
</template>

<script>
import { mapGetters } from 'vuex';
import AppSidebar from '@/components/Sidebar/AppSidebar.vue';
import {
    ROLES,
    TRADER_SIDEBAR_ITEMS,
    ADMIN_SIDEBAR_ITEMS,
    MERCHANT_SIDEBAR_ITEMS,
} from '@/helpers/constants';

export default {
    name: 'ProfileLayout',

    components: {
        AppSidebar,
    },

    computed: {
        ...mapGetters({
            isAuth: 'auth/isAuth',
            hasUser: 'auth/hasUser',
            role: 'auth/role',
        }),

        sidebarItems() {
            const SIDEBAR_ITEMS = {
                [ROLES.admin]: ADMIN_SIDEBAR_ITEMS,
                [ROLES.trader]: TRADER_SIDEBAR_ITEMS,
                [ROLES.merchant]: MERCHANT_SIDEBAR_ITEMS,
                [ROLES.operator]: ADMIN_SIDEBAR_ITEMS,
            };

            return SIDEBAR_ITEMS[this.role] || [];
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
</style>