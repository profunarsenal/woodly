<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title {{ title }}
        .form
            v-input(
                v-model="form.title"
                label="Название карты"
                placeholder="Введите название карты"
            )
            v-input(
                v-model="form.cardNumber"
                label="Номер карты"
                placeholder="0000-0000-0000-0000"
            )
            v-input(
                v-model="form.fio"
                label="ФИО владельца карты"
                placeholder="Введите ФИО владельца карты"
            )
            v-dropdown(
                v-model="form.bankType"
                :list="banks"
                label="Банк"
                placeholder="Выберите банк"
            )
            v-dropdown(
                v-model="form.processMethod"
                :list="processMethods"
                label="Метод обработки"
                placeholder="Выберите метод обработки"
            )
            v-dropdown(
                v-model="form.currency"
                :list="currencies"
                label="Валюта карты"
                placeholder="Выберите валюту карты"
            )
            v-input(
                v-model="form.deviceId"
                label="ID устройства"
                placeholder="ID устройства"
            )
            v-input(
                v-model="form.apiKey"
                label="API KEY"
                placeholder="API KEY"
            )
            v-dropdown(
                v-model="form.slotSim"
                :list="slotsSim"
                label="Слот для SIM"
                placeholder="Выберите cлот для SIM"
            )
            .checkboxes
                v-checkbox(
                    v-model="form.isQiwi"
                    id="qiwi"
                    label="Разрешить перевод с QIWI"
                )
                v-checkbox(
                    v-model="form.isSbp"
                    id="sbp"
                    label="Разрешить перевод по СБП"
                )
            v-input(
                v-model="form.phone"
                label="СБП телефон"
                placeholder="Введите телефон"
            )
            v-input(
                v-model="form.recipient"
                label="СБП имя получателя"
                placeholder="Введите имя получателя"
            )
        v-button.button(@click="createCard") Сохранить
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import VDropdown from '@/components/common/VDropdown.vue';
import VCheckbox from '@/components/common/VCheckbox.vue';

import { BANKS, PROCESS_METHODS, CURRENСIES, SLOTS_SIM } from '@/helpers/testData';

export default {
    name: 'ModalCard',

    components: {
        VInput,
        VButton,
        VDropdown,
        VCheckbox,
    },

    props: {
        componentData: {
            type: Object,
            default: null,
        },
    },

    computed: {
        title() {
            return this.componentData ? 'Редактирование карты' : 'Добавление новой карты';
        },
    },

    data() {
        return {
            banks: BANKS,
            processMethods: PROCESS_METHODS,
            currencies: CURRENСIES,
            slotsSim: SLOTS_SIM,
            selectedBank: null,
            checkbox: false,
            checkbox1: true,
            form: {
                title: '',
                cardNumber: '',
                fio: '',
                bankType: null,
                processMethod: null,
                currency: null,
                deviceId: '',
                apiKey: '',
                slotSim: null,
                isQiwi: false,
                isSbp: false,
                phone: '',
                recipient: ''
            },
        };
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        async createCard() {
            const form = {
                title: this.form.title,
                cardNumber: this.form.cardNumber,
                fio: this.form.fio,
                bankType: this.form.bankType?.id,
                processMethod: this.form.processMethod?.id,
                currency: this.form.currency?.id,
                deviceId: this.form.deviceId,
                apiKey: this.form.apiKey,
                slotSim: this.form.slotSim?.id,
                isQiwi: this.form.isQiwi,
                isSbp: this.form.isSbp,
                phone: this.form.phone,
                recipient: this.form.recipient,
            }

            await this.$api.cards.createCard(form);
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