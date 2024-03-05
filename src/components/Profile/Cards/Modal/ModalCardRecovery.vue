<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Восстановление карты
        .text {{ cardText }}
        .buttons
            v-button(
                type="secondary"
                @click="close"
            ) Отменить
            v-button(
                type="positive"
                @click="recoveryCard"
            ) Восстановить
</template>

<script>
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'ModalCardRecovery',

    components: {
        VButton,
    },

    props: {
        componentData: {
            type: Object,
            default: null,
        },
    },

    computed: {
        cardId() {
            return this.componentData?.cardId || 0;
        },

        cardName() {
            return this.componentData?.title || '';
        },

        cardNumber() {
            return this.componentData?.cardNumber || '';
        },

        cardText() {
            return `Вы уверены, что хотите восстановить карту ${this.cardName} · ${this.cardNumber}?`
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        async recoveryCard() {
            await this.$api.cards.changeCardStatus({
                cardId: this.cardId,
                status: true,
            });
            this.close();
            this.$store.dispatch('cards/getCards', this.$route.query);
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
    .text
        font-size: 1.4rem
        line-height: 2rem
        color: $color-gray-dark
        margin-bottom: 4rem
    .buttons
        display: flex
        align-items: center
        gap: 0.8rem
        &:deep(.button)
            flex: 1
</style>