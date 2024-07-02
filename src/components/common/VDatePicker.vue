<template lang="pug">
    .datepicker(:class="datepickerClasses")
        .label(v-if="label") {{ label }}
        vue-date-picker(
            v-model="date"
            :enable-time-picker="false"
            :format="format"
            :min-date="minDate"
            :max-date="maxDate"
            :placeholder="placeholder"
            :range="isRange"
            auto-apply
            position="left"
            locale="ru"
            menu-class-name="datepicker-menu"
            input-class-name="datepicker-input"
            @open="open"
            @closed="close"
        )
            template(#arrow-left)
                inline-svg.arrow.arrow-left(src="/icons/chevron.svg")
            template(#arrow-right)
                inline-svg.arrow(src="/icons/chevron.svg")
            template(#input-icon)
                inline-svg.calendar(src="/icons/calendar.svg")
            template(#clear-icon="{ clear }")
                inline-svg.clear(
                    src="/icons/close.svg"
                    @click="clear"
                )
            template(#calendar-icon)
                inline-svg.calendar(src="/icons/calendar.svg")
</template>

<script>
import VueDatePicker from '@vuepic/vue-datepicker';
import '@vuepic/vue-datepicker/dist/main.css'

import { formatDate } from '@/helpers/date';

export default {
    name: 'VDatePicker',

    components: { VueDatePicker },

    emits: ['update:modelValue'],

    props: {
        label: {
            type: String,
            default: '',
        },

        placeholder: {
            type: String,
            default: 'ДД/ММ/ГГ',
        },

        modelValue: {
            type: [null, Date, Array],
            default: null,
        },

        minDate: {
            type: [Date],
            default: null,
        },

        maxDate: {
            type: [Date],
            default: null,
        },

        isRange: {
            type: Boolean,
            default: false,
        },
    },

    data() {
        return {
            date: this.modelValue,
            isOpen: false,
        };
    },

    computed: {
        datepickerClasses() {
            return {
                focus: this.isOpen,
            };
        },
    },

    methods: {
        open() {
            this.isOpen = true;
        },

        close() {
            this.isOpen = false;
        },

        format() {
            if (!this.date) {
                return this.date;
            }

            if (this.isRange && this.date.length) {
                const [dateFrom, dateTo] = this.date;
                return `${formatDate(dateFrom)} — ${formatDate(dateTo)}`;
            }

            return formatDate(this.date);
        },
    },

    watch: {
        modelValue(newDate) {
            this.date = newDate;
        },

        date(newDate) {
            this.$emit('update:modelValue', newDate);
        },
    },
};
</script>

<style lang="sass">
.datepicker
    &.focus
        .datepicker-input
            border: 0.1rem solid $color-violet-100
            @media(any-hover:hover)
                &:hover
                    border: 0.1rem solid $color-violet-100
        .calendar,
        .clear
            fill: $color-violet-100

.label
    font-size: 1.4rem
    line-height: 2rem
    color: $color-gray-dark
    margin-bottom: 0.6rem

.datepicker-input
    height: 4.8rem
    border-radius: 1.2rem
    font-size: 1.6rem
    line-height: 2.4rem
    padding: 1.2rem 1.2rem 1.2rem 4rem
    border: none
    background-color: $color-gray-light
    border: 0.1rem solid $color-gray-light
    transition: none
    @media(any-hover:hover)
        &:hover
            border: 0.1rem solid $color-gray-100

.dp__main
    .dp__input_icon,
    .dp__clear_icon
        width: 2rem
        height: 2rem
    .dp__input_icon
        left: 1.2rem
    .dp__clear_icon
        right: 1.2rem

.datepicker-menu
    border-radius: 1.6rem
    font-family: 'Inter', sans-serif
    border: 0.1rem solid $color-gray-100
    overflow: hidden
    .dp__calendar_header_item
        font-size: 1.2rem
        font-weight: 500
        text-transform: uppercase
        color: $color-black
    .dp__calendar_item
        font-size: 1.2rem
        color: $color-black
    .dp__month_year_select,
    .dp__overlay_cell,
    .dp__overlay_cell_active
        font-size: 1.4rem
        font-weight: 500
    .dp_overlay_cell
        color: $color-black
    .dp__cell_offset
        color: $color-silver-light
    .dp__range_start
        background-color: $color-violet-100
        border-radius: 1rem 0 0 1rem
        color: $color-white
        border: none
    .dp__range_between
        background-color: rgba($color-violet-100, 0.1)
        color: $color-black
        border: none
    .dp__range_end
        background-color: $color-violet-100
        border-radius: 0 1rem 1rem 0
        color: $color-white
        border: none
    .dp__today
        color: $color-violet-100
        background-color: rgba($color-violet-100, 0.1)
        border: none
        border-radius: 1rem
        &.dp__range_between
            border-radius: 0
    .dp__active_date,
    .dp__overlay_cell_active
        border: none
        border-radius: 1rem
        color: $color-white
        background-color: $color-violet-100
    .dp__date_hover_end:hover,
    .dp__date_hover_start:hover,
    .dp__date_hover:hover,
    .dp--year-select:hover,
    .dp__month_year_select:hover,
    .dp__overlay_cell:hover,
    .dp__button:hover,
    .dp--arrow-btn-nav:hover
        &:not(.dp__range_between)
            color: $color-black
            background-color: $color-gray-light
            border: none
            border-radius: 1rem
            .arrow
                fill: $color-gray-dark
    .dp__arrow_top,
    .dp__calendar_header_separator
        display: none

.arrow
    width: 1.6rem
    height: 1.6rem
    fill: $color-silver
    &-left
        transform: rotate(180deg)

.calendar,
.clear
    width: 2rem
    height: 2rem
    fill: $color-gray-dark
</style>