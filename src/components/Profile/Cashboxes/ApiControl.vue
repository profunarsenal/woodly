<template lang="pug">
    .api
        .control
            button-mini(
                :type="type"
                @click="toggleVisibleApi"
            )
            v-tooltip.tooltip(
                position="right"
                :text="tooltipText"
            )
        .key(v-if="isVisible") {{ apiKey }}
</template>

<script>
import ButtonMini from '@/components/common/Buttons/ButtonMini.vue';
import VTooltip from '@/components/common/VTooltip.vue';

export default {
    name: 'ApiControl',

    components: {
        ButtonMini,
        VTooltip,
    },

    props: {
        apiKey: {
            type: String,
            default: '',
        },
    },

    data() {
        return {
            isVisible: false,
        };
    },

    computed: {
        type() {
            return this.isVisible ? 'eye-hide' : 'eye';
        },

        tooltipText() {
            return this.isVisible ? 'Скрыть API' : 'Показать API';
        },
    },

    methods: {
        toggleVisibleApi() {
            this.isVisible = !this.isVisible;
        },
    },
};
</script>

<style lang="sass" scoped>
.api
    display: flex
    align-items: center
    gap: 0.8rem
    height: 100%
    .control
        width: 2rem
        height: 2rem
        position: relative
        @media(any-hover:hover)
            &:hover
                .tooltip
                    opacity: 1
                    visibility: visible
                    pointer-events: all
                    transition: 0.4s ease 0.4s
    .tooltip
        opacity: 0
        visibility: hidden
        pointer-events: none
        right: calc( 100% + 0.8rem )
        top: -0.3rem
            transition: 0.2s ease
</style>