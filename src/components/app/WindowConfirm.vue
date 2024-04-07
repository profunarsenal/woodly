<template lang="pug">
    .window(v-click-outside="cancel")
        .title Подтвердить проверку
        .subtitle Вы уверены, что хотите подтвердить проверку сделки?
        .buttons
            v-button(
                type="outline"
                @click="cancel"
            ) Отменить
            v-button(
                type="positive"
                @click="confirm"
            ) Подтвердить
</template>

<script>
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'WindowConfirm',

    emits: ['cancel', 'confirm'],

    components: {
        VButton,
    },

    methods: {
        cancel() {
            this.$emit('cancel');
        },

        confirm() {
            this.$emit('confirm');
        },
    },
};
</script>

<style lang="sass" scoped>
.window
    width: 34rem
    padding: 1.6rem
    border-radius: 2rem
    border: 0.1rem solid $color-gray-100
    background-color: $color-white

.title
    font-size: 1.6rem
    font-weight: 600
    line-height: 2.4rem
    margin-bottom: 0.8rem

.subtitle
    font-size: 1.4rem
    line-height: 2rem
    color: $color-gray-dark
    margin-bottom: 2.4rem

.buttons
    display: flex
    align-items: center
    gap: 0.8rem
    &:deep(.button)
        flex: 1
</style>