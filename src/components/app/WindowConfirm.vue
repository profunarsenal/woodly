<template lang="pug">
    .window
        .title
        .subtitle
        .buttons
            v-button(type="outline") Отменить
            v-button(type="positive") Подтвердить
</template>

<script>
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'WindowConfirm',

    components: {
        VButton,
    },
};
</script>

<style lang="sass" scoped>

</style>