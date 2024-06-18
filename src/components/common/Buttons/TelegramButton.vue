<template lang="pug">
    .tg-button
        inline-svg.icon(src="/icons/tg-circle.svg")
        .content
            .title {{ $lang.ourTelegramBot }}
            .name {{ telegramBot }}
</template>

<script>
import { TELEGRAM_BOT } from '@/helpers/constants';

export default {
    name: 'TelegramButton',

    created() {
        this.telegramBot = TELEGRAM_BOT;
    },
};
</script>

<style lang="sass" scoped>
.tg-button
    display: flex
    align-items: center
    gap: 1.6rem
    .icon
        &:deep(rect)
            fill: $color-violet-100
    .content
        display: flex
        flex-direction: column
        gap: 0.2rem
        .title
            font-size: 1.2rem
            line-height: 1.8rem
            color: $color-gray-dark
        .name
            font-weight: 600
            font-size: 1.6rem
            line-height: 2.4rem
</style>