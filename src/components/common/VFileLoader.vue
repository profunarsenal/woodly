<template lang="pug">
    .file-loader
        input.input(
            id="file-input"
            type="file"
            ref="file"
            @change="upload"
        )
        .file(v-if="file")
            inline-svg.icon-file(src="/icons/file.svg")
            .info
                .name {{ fileName }}
                .weight {{ fileSize }}
            button.remove(@click="remove")
                inline-svg.icon-close(src="/icons/close.svg")
        label.loader(
            v-else
            for="file-input"
        )
            span.text Выберите файл
            span.text.sub или перетащите сюда
            inline-svg.icon(src="/icons/upload.svg")
</template>

<script>
import { converBytesToSize } from '@/helpers/file.js';
import { sliceStringAddDot } from '@/helpers/string.js';

export default {
    name: 'VFileLoader',

    emits: ['change'],

    data() {
        return {
            file: null,
        };
    },

    computed: {
        fileName() {
            const MAX_LENGTH = 35;
            return sliceStringAddDot(this.file?.name, MAX_LENGTH);
        },

        fileSize() {
            return converBytesToSize(this.file?.size);
        },
    },

    methods: {
        upload(event) {
            const { files } = event.target;
            this.file = files[0];
            this.$emit('change', this.file);
        },

        remove() {
            this.$refs.file.value = null;
            this.file = null;
            this.$emit('change', this.file);
        },
    },
};
</script>

<style lang="sass" scoped>
.file-loader
    position: relative

.input
    position: absolute
    z-index: -10
    width: 0.01rem
    height: 0.01rem
    opacity: 0

.loader
    display: flex
    align-items: center
    gap: 0.4rem
    height: 5.2rem
    padding: 1.7rem 1.6rem
    border: 0.1rem dashed $color-gray-100
    background-color: $color-gray-light
    border-radius: 1.2rem
    cursor: pointer
    transition: background-color 0.3s ease
    transition: border 0.3s ease
    @media(any-hover:hover)
        &:hover
            border: 0.1rem solid $color-gray-100
            background-color: $color-gray-100
    .text
        font-size: 1.2rem
        line-height: 1.8rem
        font-weight: 500
    .sub
        color: $color-gray-dark
    .icon
        width: 2rem
        height: 2rem
        margin-left: auto
        fill: $color-gray-dark

.file
    display: flex
    align-items: center
    gap: 1.6rem
    padding: 0.8rem 1.6rem
    height: 5.2rem
    background-color: $color-gray-light
    border-radius: 1.2rem
    .remove
        margin-left: auto
        width: 2rem
        height: 2rem
    .info
        display: flex
        flex-direction: column
        align-items: flex-start
    .icon-file
        width: 2rem
        height: 2rem
        fill: $color-violet-100
    .icon-close
        width: 2rem
        height: 2rem
        fill: $color-gray-dark
    .name,
    .weight
        font-size: 1.2rem
        font-weight: 500
        line-height: 1.8rem
    .weight
        color: $color-gray-dark
</style>