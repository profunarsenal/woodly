<template lang="pug">
    .error-404
        .content
            .title Мы не смогли найти эту страницу
            .subtitle Страницы не существует или она была удалена. Нажмите кнопку ниже, чтобы вернуться назад
            v-button.button(
                type="secondary"
            ) Вернуться назад
</template>

<script>
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'Error404',

    components: {
        VButton,
    },
};
</script>

<style lang="sass" scoped>
.error-404
    height: 100%
    background-color: $color-violet-100
    display: flex
    align-items: center
    justify-content: center
    .content
        max-width: 42rem
        text-align: center
    .title
        font-weight: 600
        font-size: 2rem
        line-height: 2.8rem
        color: $color-white
        margin-bottom: 0.6rem
    .subtitle
        font-size: 1.4rem
        line-height: 2rem
        color: rgba($color-white, 0.7)
        margin-bottom: 3.2rem
    .button
        margin: 0 auto
</style>