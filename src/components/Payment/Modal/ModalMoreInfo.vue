<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Больше информации
        ul.advantages
            li.item(
                v-for="item in info"
                :key="item"
            )
                inline-svg.item-icon(src="/icons/shield.svg")
                .item-text {{ item }}
</template>

<script>
const INFO = [
    'Перевод зачисляется, только при правильно оплаченной сумме',
    'Создание заявок без оплаты приведет к блокировке пользователя',
    'Номер карты меняется в каждом заказе',
    'Вы должны оплатить комиссию вашего банка за перевод. Перевод зачисляется автоматически, только при уплаченной комиссии.',
];

export default {
    name: 'ModalMoreInfo',

    methods: {
        close() {
            this.$store.commit('modal/close');
        },
    },

    created() {
        this.info = INFO;
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
            &-text
                font-size: 1.2rem
                line-height: 1.8rem
                letter-spacing: 0.024rem
            &-icon
                flex: 0 0 2.4rem
                fill: $color-violet-100
</style>