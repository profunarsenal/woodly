<template lang="pug">
    component(:is="layout")
    v-modal
</template>

<script>
import VModal from '@/components/common/VModal.vue';
import MainLayout from '@/layouts/MainLayout.vue';
import EmptyLayout from '@/layouts/EmptyLayout.vue';

export default {
    name: 'App',

    components: {
        MainLayout,
        EmptyLayout,
        VModal,
    },

    computed: {
        layout() {
            const layoutName = this.$route.meta.layout || 'main';
            return `${layoutName}-layout`;
        },
    },
};
</script>

<style lang="sass">
#app
    font-family: 'Inter', sans-serif
    font-size: 1.6rem
    font-weight: 400
    line-height: 2.4rem
    color: $color-black
    min-height: 100%
</style>