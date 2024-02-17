<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Почему это безопасно
        ul.advantages
            li.item(
                v-for="item in advantages"
                :key="item.title"
            )
                inline-svg.item-icon(src="/icons/shield.svg")
                .item-content
                    .item-title {{ item.title }}
                    .item-text {{ item.text }}
</template>

<script>
const ADVANTAGES = [
    {
        title: 'Переводы застрахованы',
        text: 'Все переводы застрахованы и все происходит автоматически.',
    },
    {
        title: 'Средства зарезервированны',
        text: 'Средства для пополнения вашего баланса резервируются еще до того, как вы сделали перевод. Ваши деньги защищены, еще до того, как вы их отправили.',
    },
    {
        title: 'Круглосуточная поддержка',
        text: 'Если что-то случится, у нас круглосуточная поддержка – мы во всем разберемся, ни в каком случае ничего не потеряется. Быстро и профессионально.',
    },
    {
        title: 'Данные карты в безопасности',
        text: 'Вы и ваша карта действительно в безопасности. Это простой перевод, который вы делаете сами. Данные вашей карты нигде не остаются.',
    },
];

export default {
    name: 'ModalInsurance',

    methods: {
        close() {
            this.$store.commit('modal/close');
        },
    },

    created() {
        this.advantages = ADVANTAGES;
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
        margin-bottom: 4rem
    .advantages
        display: flex
        flex-direction: column
        gap: 3.2rem
        .item
            display: flex
            align-items: flex-start
            gap: 1.6rem
            &-title
                font-size: 1.4rem
                font-weight: 600
                line-height: 2rem
                letter-spacing: 0.028rem
                margin-bottom: 0.8rem
            &-text
                font-size: 1.2rem
                line-height: 1.8rem
                letter-spacing: 0.024rem
            &-icon
                flex: 0 0 2.4rem
                fill: $color-violet-100
</style>