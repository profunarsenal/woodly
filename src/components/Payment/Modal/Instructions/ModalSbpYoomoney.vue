<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Инструкция по оплате с Yoomoney через СБП

        .informer
            inline-svg.icon(src="/icons/info.svg")
            .text Обращаем внимание, что переводы через СБП доступны только в мобильном приложении ЮMoney, а не на сайте.
        
        ul.instructions
            li.item(
                v-for="item in instructions"
                :key="item.step"
            )
                .content
                    .step {{ `Шаг №${item.step}` }}
                    .text(v-html="item.text")
                img.image(:src="item.image")
</template>

<script>
const INSTRUCTIONS = [
    {
        step: 1,
        text: 'В приложении выберите раздел «Каталог»',
        image: '/images/instructions/sbp/yoomoney/image-1.png',
    },
    {
        step: 2,
        text: 'На вкладке «Перевести» выберите раздел «По номеру телефона»',
        image: '/images/instructions/sbp/yoomoney/image-2.png',
    },
    {
        step: 3,
        text: 'Введите номер телефона получателя или выберите его из списка контактов',
        image: '/images/instructions/sbp/yoomoney/image-3.png',
    },
    {
        step: 4,
        text: 'Нажмите кнопку «В другой банк через СБП»',
        image: '/images/instructions/sbp/yoomoney/image-4.png',
    },
    {
        step: 5,
        text: 'В появившемся списке банков выберите банк получателя',
        image: '/images/instructions/sbp/yoomoney/image-5.png',
    },
    {
        step: 6,
        text: 'Введите сумму перевода и нажмите «Далее»',
        image: '/images/instructions/sbp/yoomoney/image-6.png',
    },
    {
        step: 7,
        text: 'Проверьте номер телефона и сумму перевода, а затем нажмите «Да»',
        image: '/images/instructions/sbp/yoomoney/image-7.png',
    },
];

export default {
    name: 'ModalSbpYoomoney',

    methods: {
        close() {
            this.$store.commit('modal/close');
        },
    },

    created() {
        this.instructions = INSTRUCTIONS;
    },
};
</script>

<style lang="sass" scoped>
.wrapper
    position: relative
    width: 59rem
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
    .informer
        display: flex
        align-items: center
        gap: 1.2rem
        padding: 1.6rem
        margin-bottom: 4rem
        border-radius: 1.6rem
        background-color: $color-gray-light
        .icon
            flex: 0 0 2rem
            fill: $color-gray-dark
        .text
            font-size: 1.2rem
            line-height: 1.8rem
    .instructions
        display: flex
        flex-direction: column
        gap: 4rem
        .content
            margin-bottom: 1.6rem
            display: flex
            align-items: center
            gap: 1.2rem
            .text,
            .step
                font-size: 1.2rem
                line-height: 1.8rem
            .step
                align-self: flex-start
                padding: 0.9rem 1.6rem
                font-weight: 500
                color: $color-violet-100
                border-radius: 3.2rem
                white-space: nowrap
                background-color: rgba($color-violet-100, 0.1)
        .image
            max-width: 100%
</style>