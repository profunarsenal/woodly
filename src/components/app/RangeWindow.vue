<template lang="pug">
    .window
        .pickers(v-if="isDate")
            v-date-picker(
                v-model="start"
                :max-date="end"
                :label="$lang.dateFrom"
            )
            v-date-picker(
                v-model="end"
                :min-date="start"
                :label="$lang.dateTo"
            )
        .inputs(v-else)
            v-input(
                v-model="start"
                :label="labels[0]"
                :placeholder="placeholders[0]"
            )
            v-input(
                v-model="end"
                :label="labels[1]"
                :placeholder="placeholders[1]"
            )
        .buttons
            v-button(
                :isDisabled="!canReset"
                type="secondary"
                size="large"
                @click="reset"
            ) {{ $lang.reset }}
            v-button(
                :isDisabled="!canUnload"
                size="large"
                @click="apply"
            ) {{ applyButton }}
</template>

<script>
import VDatePicker from '@/components/common/VDatePicker.vue';
import VButton from '@/components/common/VButton.vue';
import VInput from '@/components/common/VInput.vue';

import { formatDate } from '@/helpers/string';

export default {
    name: 'RangeWindow',

    components: {
        VDatePicker,
        VButton,
        VInput,
    },

    props: {
        isDate: {
            type: Boolean,
            default: false,
        },

        labels: {
            type: Array,
            default: () => ['', ''],
        },

        placeholders: {
            type: Array,
            default: () => ['', ''],
        },

        applyButton: {
            type: String,
            default: '',
        },

        value: {
            type: Array,
            default: () => [],
        },
    },

    data() {
        return {
            start: null,
            end: null,
        };
    },

    computed: {
        canUnload() {
            return this.start && this.end;
        },

        canReset() {
            return this.start || this.end;
        },
    },

    methods: {
        reset() {
            this.start = null;
            this.end = null;

            this.$emit('apply', {
                start: this.start,
                end: this.end,
            });
        },

        apply() {
            let start = this.start;
            let end = this.end;

            if (this.isDate) {
                start = formatDate(this.start).split('.').join('-');
                end = formatDate(this.start).split('.').join('-');
            }

            this.$emit('apply', {
                start,
                end,
            });
        },
    },

    watch: {
        value: {
            handler(newValue) {
                let [firstValue, secondValue] = newValue;

                if (!firstValue && !secondValue) {
                    return;
                }
                
                if (this.isDate) {
                    firstValue = firstValue.split('-').reverse().join('-');
                    secondValue = secondValue.split('-').reverse().join('-');

                    this.start = new Date(firstValue);
                    this.end = new Date(secondValue);

                    return;
                }

                this.start = firstValue;
                this.end = secondValue;
            },

            immediate: true,
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
    .buttons,
    .inputs
        display: flex
        align-items: center
        gap: 1.2rem
        &:deep(.button),
        &:deep(.datepicker),
        &:deep(.input-wrapper)
            flex: 1
</style>