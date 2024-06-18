<template lang="pug">
    .window
        .pickers
            v-date-picker(
                v-model="dateStart"
                :max-date="dateEnd"
                :label="$lang.dateFrom"
            )
            v-date-picker(
                v-model="dateEnd"
                :min-date="dateStart"
                :label="$lang.dateTo"
            )
        .buttons
            v-button(
                :isDisabled="!canReset"
                type="secondary"
                @click="reset"
            ) {{ $lang.reset }}
            v-button(
                :isDisabled="!canUnload"
                @click="unload"
            ) {{ $lang.unload }}
</template>

<script>
import VDatePicker from '@/components/common/VDatePicker.vue';
import VButton from '@/components/common/VButton.vue';

import { formatDate } from '@/helpers/string';

export default {
    name: 'ExportWindow',

    components: {
        VDatePicker,
        VButton,
    },

    data() {
        return {
            dateStart: null,
            dateEnd: null,
        };
    },

    computed: {
        canUnload() {
            return this.dateStart && this.dateEnd;
        },

        canReset() {
            return this.dateStart || this.dateEnd;
        },
    },

    methods: {
        reset() {
            this.dateStart = null;
            this.dateEnd = null;
        },

        unload() {
            const dateStart = formatDate(this.dateStart).split('.').join('-');
            const dateEnd = formatDate(this.dateStart).split('.').join('-');
            this.$emit('unload', {
                dateStart,
                dateEnd,
            });
        },
    },
};
</script>

<style lang="sass" scoped>
.window
    position: absolute
    z-index: 99
    top: calc( 100% + 0.8rem )
    right: 0
    min-width: 61.8rem
    padding: 1.2rem 1.6rem
    border-radius: 2rem
    background-color: $color-white
    border: 0.1rem solid $color-gray-100
    display: flex
    flex-direction: column
    gap: 2.4rem
    .pickers,
    .buttons
        display: flex
        align-items: center
        gap: 1.2rem
        &:deep(.button),
        &:deep(.datepicker)
            flex: 1
</style>