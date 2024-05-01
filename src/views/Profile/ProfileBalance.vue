<template lang="pug">
    .profile-balance
        .header
            .title Баланс
            .id Мой ID: 157
        .currencies
            currency-block
</template>

<script>
import CurrencyBlock from '@/components/Profile/Balance/CurrencyBlock.vue';

export default {
    name: 'ProfileBalance',

    components: {
        CurrencyBlock,
    },
};
</script>

<style lang="sass" scoped>
.profile-balance
    display: flex
    flex-direction: column
    margin-top: 0.8rem
    padding: 2.4rem 3.2rem 9.8rem 3.2rem
    background-color: $color-white
    border-radius: 2rem 0 0 0
    width: 100%
    flex: 1 1 auto

.header
    display: flex
    align-items: center
    justify-content: space-between
    gap: 1.6rem
    margin-bottom: 3.2rem
    .title,
    .id
        font-weight: 600
        font-size: 3.2rem
        line-height: 3.2rem
    .id
        color: $color-silver-light
</style>