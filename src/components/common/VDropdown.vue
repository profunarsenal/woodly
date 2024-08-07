<template lang="pug">
    .dropdown(:class="dropdownClasses")
        .label {{ label }}
        .input-wrapper(v-click-outside="close")
            input.input(
                :value="title"
                :placeholder="placeholder"
                :disabled="isDisabled"
                @click="toggle"
                type="text"
                ref="field"
                readonly
            )
            inline-svg.chevron(src="/icons/chevron-dropdown.svg")
            .list-wrapper(v-if="isOpenList")
                ul.list
                    li.item(
                        v-for="item in list"
                        :key="item.id"
                        :class="{ selected: modelValue === item.id }"
                        @click.stop="select(item)"
                    )
                        span {{ item.title }}
                        inline-svg.icon(
                            v-if="modelValue === item.id"
                            src="/icons/check.svg"
                        )
</template>

<script>
export default {
    name: 'VDropdown',

    emits: ['update:modelValue', 'onChange'],

    props: {
        modelValue: {
            type: [Number, String],
            default: null,
        },

        label: {
            type: String,
            default: '',
        },

        placeholder: {
            type: String,
            default: '',
        },

        isDisabled: {
            type: Boolean,
            default: false,
        },

        list: {
            type: Array,
            default: [],
        },
    },

    data() {
        return {
            isOpenList: false,
        };
    },

    computed: {
        title() {
            const currentItem = this.list.find(item => item.id === this.modelValue);
            return currentItem?.title || '';
        },

        dropdownClasses() {
            return {
                opened: this.isOpenList,
                disabled: this.isDisabled,
            };
        },
    },

    methods: {
        toggle() {
            this.isOpenList = !this.isOpenList;

            if (this.modelValue && !this.isOpenList) {
                this.$refs.field.blur();
            }
        },

        select(item) {
            this.$emit('update:modelValue', item.id);
            this.$emit('onChange', item.id);
            this.isOpenList = false;
        },

        close() {
            this.isOpenList = false;
        },
    },
};
</script>

<style lang="sass" scoped>
.dropdown
    display: flex
    flex-direction: column
    gap: 0.6rem
    .label
        align-self: flex-start
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
    .input-wrapper
        position: relative
        .input
            width: 100%
            padding: 1.2rem
            background-color: $color-gray-light
            border-radius: 1.2rem
            height: 4.8rem
            cursor: pointer
            font-size: 1.6rem
            line-height: 2.4rem
            border: 0.1rem solid $color-gray-light
            &::placeholder
                font-size: 1.6rem
                color: $color-gray-dark
            &:not(:disabled)
                &:hover
                    border: 0.1rem solid $color-gray-100
                &:focus,
                &:active
                    border: 0.1rem solid $color-violet-100
            &:disabled
                color: $color-silver-light
                &::placeholder
                    color: $color-silver-light
        .chevron
            position: absolute
            top: 1.4rem
            right: 1.4rem
            width: 2rem
            height: 2rem
            fill: $color-gray-dark
            transition: transform 0.3s ease
    .list-wrapper
        position: absolute
        z-index: 20
        top: calc( 100% + 0.4rem )
        width: 100%
        max-height: 21.6rem
        overflow-y: auto
        padding: 0.8rem
        border-radius: 1.2rem
        background-color: $color-white
        border: 0.1rem solid $color-gray-100
        box-shadow: 0 0 0.4rem 0 rgba(0, 0, 0, 0.04)
        box-shadow: 0 0.4rem 3.2rem 0 rgba(0, 0, 0, 0.16)
        .list
            display: flex
            flex-direction: column
            gap: 0.2rem
            .item
                display: flex
                justify-content: space-between
                gap: 1.2rem
                padding: 1rem
                font-weight: 500
                font-size: 1.2rem
                line-height: 1.8rem
                background-color: $color-white
                border-radius: 0.8rem
                transition: background-color 0.3s ease
                cursor: pointer
                @media(any-hover:hover)
                    &:hover
                        background-color: $color-gray-light
                &.selected
                    background-color: rgba($color-violet-100, 0.1)
                .icon
                    width: 1.6rem
                    height: 1.6rem
                    &:deep(path:first-child)
                        fill: $color-violet-100
    &.opened
        .chevron
            transform: rotate(-180deg)
    &.disabled
        .chevron
            fill: $color-silver
</style>