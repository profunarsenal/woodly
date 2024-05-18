<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Прикрепление чека
        .subtitle(v-if="purchaseId") к сделке: {{ purchaseId }}
        v-file-loader.file-loader(
            v-model="files"
            :extensions="imageExtensions"
        )
        v-button.button(
            :isDisabled="!files.length"
            :isLoading="isUploading"
            @click="sendCheck"
        ) Отправить
</template>

<script>
import VButton from '@/components/common/VButton.vue';
import VFileLoader from '@/components/common/VFileLoader.vue';

export default {
    name: 'ModalCorrection',

    components: {
        VButton,
        VFileLoader,
    },

    props: {
        componentData: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            files: [],
            imageExtensions: '.jpg, .gif, .jpeg, .png, .webp',
            isUploading: false,
        };
    },

    computed: {
        purchaseId() {
            return this.componentData?.purchaseId;
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        async sendCheck() {
            const file = new Blob([this.files[0]], { type: 'image/png' });

            try {
                this.isUploading = true;
                await this.$api.purchases.uploadCheck(this.purchaseId, file);
                this.close();
            } catch (error) {
                console.log(error);
            } finally {
                this.isUploading = false;
            }
        },
    },
};
</script>

<style lang="sass" scoped>
.wrapper
    position: relative
    width: 44.2rem
    padding: 2rem 2.4rem 2.4rem 2.4rem
    background-color: $color-white
    border-radius: 2.4rem
    .close
        position: absolute
        top: 2.4rem
        right: 2.4rem
        width: 2rem
        height: 2rem
        .icon
            fill: $color-gray-dark
            transition: fill 0.3s ease
        @media(any-hover:hover)
            &:hover
                .icon
                    fill: $color-black
    .title
        font-size: 2rem
        font-weight: 600
        line-height: 2.8rem
        margin-bottom: 0.8rem
    .subtitle
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        margin-bottom: 3.2rem
    .file-loader
        margin-bottom: 1.2rem
    .button
        width: 100%
</style>