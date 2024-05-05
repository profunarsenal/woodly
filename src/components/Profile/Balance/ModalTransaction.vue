<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Перевод средств
        .form
            v-input(
                v-model="id"
                label="ID получателя"
                placeholder="ID получателя"
            )
            v-input(
                v-model="amount"
                type="number"
                label="Сумма перевода"
                placeholder="Сумма перевода"
            )
        v-button.button(
            :isDisabled="isButtonDisabled"
            @click="transfer"
        ) Перевести
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'ModalCorrection',

    components: {
        VInput,
        VButton,
    },

    props: {
        componentData: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            id: '',
            amount: '',
        };
    },

    computed: {
        isButtonDisabled() {
            return !this.id || !this.amount;
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        transfer() {
            console.log('transfer');
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
        margin-bottom: 3.2rem
    .form
        display: flex
        flex-direction: column
        gap: 2rem
        margin-bottom: 4rem
    .button
        width: 100%
</style>