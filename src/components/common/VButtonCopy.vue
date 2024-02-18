<template lang="pug">
    .button-copy
        .text {{ text }}
        button.button(@click="copy")
            inline-svg.icon(:src="icon")
</template>

<script>
export default {
    name: 'ButtonCopy',

    props: {
        text: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            isCopied: false,
        };
    },

    computed: {
        icon() {
            return this.isCopied ? '/icons/check.svg' : '/icons/copy.svg';
        },
    },

    methods: {
        copy() {
            window.navigator.clipboard.writeText(this.text);

            this.isCopied = true;

            setTimeout(() => {
                this.isCopied = false;
            }, 3000);
        },
    },
};
</script>

<style lang="sass" scoped>
.button-copy
    display: flex
    gap: 0.8rem
    .button
        width: 2.4rem
        height: 2.4rem
        @media(any-hover:hover)
            &:hover
                .icon
                    fill: $color-violet-100
    .icon
        width: 100%
        height: 100%
        fill: $color-silver
        transition: fill 0.3s ease
</style>