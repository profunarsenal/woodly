<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title Редактирование карты
        .form
            v-input(
                label="Название карты"
                placeholder="Введите название карты"
            )
            v-input(
                label="Номер карты"
                placeholder="0000-0000-0000-0000"
            )
            v-input(
                label="ФИО владельца карты"
                placeholder="Введите ФИО владельца карты"
            )
            v-dropdown(
                v-model="selectedBank"
                :list="banks"
                label="Банк"
                placeholder="Выберите банк"
            )
            v-dropdown(
                label="Метод обработки"
                placeholder="Выберите метод обработки"
            )
            v-dropdown(
                label="Валюта карты"
                placeholder="Выберите валюту карты"
            )
            v-input(
                label="ID устройства"
                placeholder="ID устройства"
            )
            v-input(
                label="API KEY"
                placeholder="API KEY"
            )
            v-dropdown(
                label="Слот для SIM"
                placeholder="Выберите cлот для SIM"
            )
            .checkboxes
                v-checkbox(
                    v-model="checkbox"
                    id="qiwi"
                    label="Разрешить перевод с QIWI"
                )
                v-checkbox(
                    v-model="checkbox1"
                    id="sbp"
                    label="Разрешить перевод по СБП"
                )
            v-input(
                label="СБП телефон"
                placeholder="Введите телефон"
            )
            v-input(
                label="СБП имя получателя"
                placeholder="Введите имя получателя"
            )
        v-button.button Сохранить
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import VDropdown from '@/components/common/VDropdown.vue';
import VCheckbox from '@/components/common/VCheckbox.vue';

import { BANKS } from '@/helpers/testData';

export default {
    name: 'ModalCard',

    components: {
        VInput,
        VButton,
        VDropdown,
        VCheckbox,
    },

    data() {
        return {
            banks: BANKS,
            selectedBank: null,
            checkbox: false,
            checkbox1: true,
        };
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
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
    .checkboxes
        display: flex
        flex-direction: column
        gap: 1.6rem
    .button
        width: 100%
</style>