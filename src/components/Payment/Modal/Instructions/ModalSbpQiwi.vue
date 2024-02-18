<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Инструкция по оплате с QIWI через СБП

        v-tabs.tabs(
            v-model="currentTab"
            :tabs="tabs"
        )

        ul.instructions
            li.item(
                v-for="item in instructions[currentTab]"
                :key="item.step"
            )
                .content
                    .step {{ `Шаг №${item.step}` }}
                    .text(v-html="item.text")
                img.image(:src="item.image")
</template>

<script>
import VTabs from '@/components/common/VTabs.vue';

const INSTRUCTIONS = [
    [
        {
            step: 1,
            text: 'После авторизации в кошельке перейдите на вкладку «Платежи»',
            image: '/images/instructions/sbp/qiwi/site/image-1.png',
        },
        {
            step: 2,
            text: 'Выберите раздел «Денежные переводы»',
            image: '/images/instructions/sbp/qiwi/site/image-2.png',
        },
        {
            step: 3,
            text: 'Выберите раздел «Система быстрых платежей»',
            image: '/images/instructions/sbp/qiwi/site/image-3.png',
        },
        {
            step: 4,
            text: 'Вставьте скопированный ранее номер телефона или впишите его вручную',
            image: '/images/instructions/sbp/qiwi/site/image-4.png',
        },
        {
            step: 5,
            text: 'Выберите банк получателя',
            image: '/images/instructions/sbp/qiwi/site/image-5.png',
        },
        {
            step: 6,
            text: 'Введите сумму платежа и нажмите кнопку «Проверить данные»',
            image: '/images/instructions/sbp/qiwi/site/image-6.png',
        },
        {
            step: 7,
            text: 'Проверьте номер телефона и сумму перевода, а затем нажмите «Оплатить»',
            image: '/images/instructions/sbp/qiwi/site/image-7.png',
        },
    ],
    [
        {
            step: 1,
            text: 'После авторизации в кошельке в разделе «Платежи и переводы» нажмите «Все»',
            image: '/images/instructions/sbp/qiwi/mobile/image-1.png',
        },
        {
            step: 2,
            text: 'Выберите раздел «Системы денежных переводов»',
            image: '/images/instructions/sbp/qiwi/mobile/image-2.png',
        },
        {
            step: 3,
            text: 'Выберите раздел «Система быстрых платежей»',
            image: '/images/instructions/sbp/qiwi/mobile/image-3.png',
        },
        {
            step: 4,
            text: 'Вставьте скопированный ранее номер телефона или впишите его вручную. Нажмите кнопку «Продолжить».',
            image: '/images/instructions/sbp/qiwi/mobile/image-4.png',
        },
        {
            step: 5,
            text: 'Выберите банк получателя',
            image: '/images/instructions/sbp/qiwi/mobile/image-5.png',
        },
        {
            step: 6,
            text: 'Введите сумму платежа и нажмите кнопку «Продолжить»',
            image: '/images/instructions/sbp/qiwi/mobile/image-6.png',
        },
        {
            step: 7,
            text: 'Проверьте номер телефона и сумму перевода, а затем нажмите «Оплатить»',
            image: '/images/instructions/sbp/qiwi/mobile/image-7.png',
        },
    ],
];

export default {
    name: 'ModalSbpQiwi',

    components: {
        VTabs,
    },

    data() {
        return {
            currentTab: 0,
        };
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },
    },

    created() {
        this.instructions = INSTRUCTIONS;
        this.tabs = [
            { id: 0, value: 'Сайт' },
            { id: 1, value: 'Мобильное приложение' },
        ];
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
    .tabs
        margin-bottom: 4rem
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