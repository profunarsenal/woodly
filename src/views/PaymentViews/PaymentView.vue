<template lang="pug">
    payment-wrapper
        template(#content)
            payment-status(
                v-if="status"
                :status="status"
            )

            template(v-else)
                .systems(v-if="isVisibleSystems")
                    .title Выберите удобный способ оплаты
                    .types
                        .type(
                            v-for="system in paymentSystems"
                            :key="system.id"
                            @click="selectSystem(system.type)"
                        )
                            img.icon(
                                v-if="system.icon"
                                :src="system.icon"
                            )
                            .name {{ system.title }}

                .payment-window(v-if="selectedSystem")
                    .title Переведите через СБП
                    .form
                        ul.list
                            li.item
                                .key Номер телефона
                                v-button-copy.value(text="+7 985 015-48-09")
                            li.item
                                .key Получатель
                                .value Егор И.
                            li.item
                                .key Банк получателя
                                .value Тинькофф
                            li.item
                                .key Сумма с комиссией
                                .value 280 руб
                        .buttons
                            v-button(@click="pay") Я оплатил
                            v-button(type="secondary") Не удается перевести по реквизитам

        template(#buttons)
            .buttons-info(:class="buttonsClasses")
                button.button(@click="openModalInsurance")
                    span.text Страхование платежа
                    inline-svg.icon(src="/icons/info.svg")
                button.button(
                    v-if="selectedSystem"
                    @click="openModalMoreInfo"
                )
                    span.text Больше информации
                    inline-svg.icon(src="/icons/info.svg")
                button.button(
                    v-if="selectedSystem"
                    @click="openMenuInstructions"
                )
                    span.text Инструкции по оплате
                    inline-svg.icon(src="/icons/info.svg")
                    ul.menu(v-if="isVisibleMenuInstructions")
                        li.menu-item(
                            v-for="item in menuInstructions.card"
                            :key="item.modal"
                            @click="openModalInstructions(item.modal)"
                        )
                            inline-svg.icon(:src="`/icons/pay/${item.icon}.svg`")
                            .text {{ item.text }}
</template>

<script>
import { mapState } from 'vuex';
import PaymentWrapper from '@/components/Payment/PaymentWrapper.vue';
import PaymentStatus from '@/components/Payment/PaymentStatus.vue';
import VButton from '@/components/common/VButton.vue';
import VButtonCopy from '@/components/common/VButtonCopy.vue';
import { PAYMENT_SYSTEMS } from '@/helpers/testData';

const MENU_INSTRUCTIONS = {
    card: [
        {
            text: 'Оплата на карту c Qiwi',
            icon: 'qiwi',
            modal: {
                component: 'ModalCardQiwi',
            },
        },
        {
            text: 'Оплата на карту c Yoomoney',
            icon: 'yoomoney',
            modal: {
                component: '',
            },
        },
    ],
    sbp: [],
};

export default {
    name: 'PaymentView',

    components: {
        PaymentWrapper,
        PaymentStatus,
        VButton,
        VButtonCopy,
    },

    data() {
        return {
            selectedSystem: null,
            paymentSystemType: '',
            paymentSystems: PAYMENT_SYSTEMS,
            isVisibleMenuInstructions: false,
            menuInstructions: MENU_INSTRUCTIONS,
        };
    },

    computed: {
        ...mapState({
            status: ({ payment }) => payment.status,
        }),

        buttonsClasses() {
            return { row: this.selectedSystem };
        },

        isVisibleSystems() {
            return this.paymentSystems.length && !this.selectedSystem;
        },
    },

    methods: {
        selectSystem(type) {
            this.selectedSystem = type;
        },

        pay() {
            console.log("PAY")
        },

        openModalInsurance() {
            this.$store.commit('modal/open', {
                component: 'ModalInsurance',
                positionCenter: true,
            });
        },

        openModalMoreInfo() {
            this.$store.commit('modal/open', {
                component: 'ModalMoreInfo',
                positionCenter: true,
            });
        },

        openModalInstructions(modal) {
            this.$store.commit('modal/open', {
                component: modal.component,
                positionCenter: modal.positionCenter ?? false,
            });
        },

        openMenuInstructions() {
            this.isVisibleMenuInstructions = !this.isVisibleMenuInstructions;
        },
    },
};
</script>

<style lang="sass" scoped>
.systems
    padding: 2rem 1.6rem 1.6rem 1.6rem
    width: 44.2rem
    border-radius: 1.6rem
    background-color: $color-white
    .title
        margin-bottom: 3.2rem
        font-weight: 500
        text-align: center
    .types
        display: flex
        flex-wrap: wrap
        gap: 0.8rem
    .type
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        gap: 0.6rem
        flex: 1 1 32%
        height: 14.8rem
        border-radius: 1.2rem
        background-color: $color-gray-light
        cursor: pointer
        transition: border 0.3s ease
        @media(any-hover:hover)
            &:hover
                border: 1px solid $color-violet-100
        .icon
            width: 4.4rem
            height: 4.4rem
        .name
            font-size: 1.2rem
            line-height: 1.8rem
            color: $color-gray-dark

.payment-window
    display: flex
    flex-direction: column
    width: 44.2rem
    background-color: $color-gray-light
    .title
        margin-bottom: 1.6rem
        text-align: center
        font-weight: 500
    .form
        padding: 2rem 1.6rem 1.6rem 1.6rem
        border-radius: 1.6rem
        background-color: $color-white
        .list
            display: flex
            flex-direction: column
            margin-bottom: 3.2rem
        .item
            display: flex
            align-items: center
            gap: 1.6rem
            padding: 1.6rem 0
            &:first-child
                padding-top: 0
            &:last-child
                padding-bottom: 0
            &:not(:last-child)
                border-bottom: 0.1rem solid $color-gray-divider
            .icon
                fill: $color-gray-dark
            .key
                color: $color-gray-dark
            .value
                margin-left: auto
                font-weight: 500
    .buttons
        display: flex
        flex-direction: column
        gap: 0.8rem

.buttons-info
    display: flex
    gap: 1.2rem
    margin-top: 1.6rem
    width: 44.2rem
    border-radius: 1.6rem
    &.row
        .button
            flex-direction: column
            .text
                order: 1
    .button
        position: relative
        display: flex
        align-items: center
        justify-content: space-between
        gap: 1rem
        width: 100%
        padding: 2.1rem 2rem
        background-color: $color-white
        border-radius: 1.6rem
        transition: box-shadow 0.3s ease
        @media(any-hover:hover)
            &:hover
                box-shadow: 0 0.4rem 3.2rem 0 rgba(0, 0, 0, 0.08)
                .icon
                    fill: $color-violet-100
        .text
            font-size: 1.2rem
            line-height: 1.8rem
            letter-spacing: 0.024rem
        .icon
            fill: $color-silver
            transition: fill 0.3s ease
        .menu
            position: absolute
            bottom: calc( 100% - -0.4rem )
            right: 0
            padding: 0.8rem
            min-width: 24rem
            background-color: $color-white
            border: 0.1rem solid $color-gray-100
            border-radius: 1.2rem
            box-shadow: 0px 0px 4px 0px rgba(0, 0, 0, 0.04)
            box-shadow: 0px 4px 32px 0px rgba(0, 0, 0, 0.16)
            .menu-item
                display: flex
                gap: 0.6rem
                padding: 1rem
                .text
                    font-weight: 500
                    font-size: 1.2rem
                    line-height: 1.8rem
                .icon
                    flex: 0 0 1.6rem
</style>