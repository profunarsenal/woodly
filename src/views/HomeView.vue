<template lang="pug">
    .home Home
</template>

<script>
import { API } from '@/helpers/constants';

export default {
    name: 'HomeView',

    mounted() {
        this.$router.push(API.profile.cards);
    },
};
</script>