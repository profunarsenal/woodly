<template lang="pug">
    router-view
    v-modal
</template>

<script>
import VModal from '@/components/common/VModal.vue';

export default {
    name: 'App',

    components: {
        VModal,
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