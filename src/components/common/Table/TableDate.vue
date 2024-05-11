<template lang="pug">
    .date {{ formatDate(date) }} · 
        |
        span.time {{ formatTime(date) }}
</template>

<script>
import { formatDate, formatTime } from '@/helpers/string';

export default {
    name: 'TableDate',

    props: {
        date: {
            type: String,
            required: true,
        },
    },

    data() {
        return {
            formatDate: formatDate,
            formatTime: formatTime,
        };
    },
};
</script>

<style lang="sass" scoped>
.time
    color: $color-gray-dark
</style>