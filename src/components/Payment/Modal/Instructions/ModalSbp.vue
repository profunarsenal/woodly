<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Инструкция по оплате через СБП

        .informer
            img.image(src="/images/logo-sbp.png")
            .content
                .text(v-html="informerText")
                a.bank-list(
                    href="https://sbp.nspk.ru/participants"
                    target="_blank"
                ) Список банков с оплатой через СБП
        
        ul.instructions
            li.item(
                v-for="item in instructions"
                :key="item.step"
            )
                .content
                    .step {{ `Шаг №${item.step}` }}
                    .text(v-html="item.text")
</template>

<script>
const INSTRUCTIONS = [
    {
        step: 1,
        text: 'Скопируйте номер телефона',
    },
    {
        step: 2,
        text: 'В приложении банка выберите перевод «по номеру телефона» или «через СБП»',
    },
    {
        step: 3,
        text: 'Вставьте скопированный ранее номер телефона',
    },
    {
        step: 4,
        text: 'Выберите банк получателя',
    },
    {
        step: 5,
        text: 'Введите сумму, проверьте данные получателя и подтвердите перевод',
    },
];
const INFORMER_TEXT = '<p class="paragraph">Вы можете оплатить заказы через СБП (Систему Быстрых Платежей), если мобильное приложение вашего банка поддерживает эту функцию.</p><p>Сейчас платить через СБП можно в приложениях банков Тинькофф, Сбербанк, ВТБ, ТКС, Райфайзен, Русский Стандарт и некоторых других. Проверьте, есть ли ваш банк в списке.</p>';

export default {
    name: 'ModalSbp',

    methods: {
        close() {
            this.$store.commit('modal/close');
        },
    },

    created() {
        this.instructions = INSTRUCTIONS;
        this.informerText = INFORMER_TEXT;
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
        gap: 2.4rem
        padding: 1.6rem
        border-radius: 1.6rem
        background-color: $color-gray-light
        margin-bottom: 4rem
        .image
            flex: 0 0 9.6rem
            height: 4.8rem
        .text,
        .bank-list
            font-size: 1.2rem
            line-height: 1.8rem
        .bank-list
            margin-top: 2.4rem
            font-weight: 500
            color: $color-violet-100
        &:deep(.paragraph)
            margin-bottom: 1.68rem
    .instructions
        display: flex
        flex-direction: column
        gap: 2rem
        .content
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
</style>