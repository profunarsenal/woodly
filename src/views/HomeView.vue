<template lang="pug">
    .home Home
</template>

<script>
import { mapGetters } from 'vuex';
import { PAGES, USER_PAGES } from '@/helpers/constants';

export default {
    name: 'HomeView',

    computed: {
        ...mapGetters({
            isAuth: 'auth/isAuth',
            role: 'auth/role',
        }),
    },

    mounted() {
        if (!this.isAuth) {
            this.$router.push(PAGES.auth);
        } else {
            const [firstPage] = USER_PAGES[this.role];
            this.$router.push(firstPage.path);
        }
    },
};
</script>