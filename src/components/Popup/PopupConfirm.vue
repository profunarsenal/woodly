<template lang="pug">
    .window(v-click-outside="componentData.callbackCancel")
        .title {{ componentData.title }}
        .subtitle {{ componentData.subtitle }}
        .buttons
            v-button(
                type="secondary"
                @click="componentData.callbackCancel"
            ) {{ componentData.buttonCancel }}
            v-button(
                :type="type"
                @click="componentData.callbackConfirm"
            ) {{ componentData.buttonConfirm }}
</template>

<script>
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'PopupConfirm',

    props: {
        componentData: {
            type: Object,
            required: true,
        },

        type: {
            type: String,
            default: 'primary',
        },
    },

    components: {
        VButton,
    },
};
</script>

<style lang="sass" scoped>
.window
    width: 34rem
    padding: 1.6rem
    border-radius: 2rem
    border: 0.1rem solid $color-gray-100
    background-color: $color-white

.title
    font-size: 1.6rem
    font-weight: 600
    line-height: 2.4rem
    margin-bottom: 0.8rem

.subtitle
    font-size: 1.4rem
    line-height: 2rem
    color: $color-gray-dark
    margin-bottom: 2.4rem

.buttons
    display: flex
    align-items: center
    gap: 0.8rem
    &:deep(.button)
        flex: 1
</style>