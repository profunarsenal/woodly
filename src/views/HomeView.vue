<template lang="pug">
    .home Home
</template>

<script>
export default {
    name: 'HomeView',

    mounted() {
        this.$router.push('/payment');
    },
};
</script>