<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title {{ title }}
        .form
            v-input(
                v-model="form.title"
                :label="$lang.cardName"
                :placeholder="$lang.enterCardName"
            )
            v-input(
                v-model="form.cardNumber"
                v-mask="'#### #### #### ####'"
                :label="$lang.cardNumber"
                placeholder="0000 0000 0000 0000"
            )
            v-input(
                v-model="form.fio"
                :label="$lang.fullNameCardOwner"
                :placeholder="$lang.enterFullNameCardOwner"
            )
            v-dropdown(
                v-model="form.bankType"
                :list="banks"
                :label="$lang.bank"
                :placeholder="$lang.chooseBank"
            )
            v-dropdown(
                v-model="form.processMethod"
                :list="processMethods"
                :label="$lang.processingMethod"
                :placeholder="$lang.chooseProcessingMethod"
            )
            v-dropdown(
                v-model="form.currency"
                :list="currencies"
                :label="$lang.cardCurrency"
                :placeholder="$lang.chooseCardCurrency"
            )
            v-input(
                v-if="isEdit"
                v-model="form.deviceId"
                :label="$lang.deviceId"
                :placeholder="$lang.deviceId"
            )
            v-input(
                v-model="form.apiKey"
                :label="$lang.apiKey"
                :placeholder="$lang.apiKey"
            )
            v-dropdown(
                v-model="form.slotSim"
                :list="slotsSim"
                :label="$lang.slotSim"
                :placeholder="$lang.chooseSlotSim"
            )
            .checkboxes
                v-checkbox(
                    v-model="form.isSbp"
                    id="sbp"
                    :label="$lang.allowTransferSbp"
                )
            v-input(
                v-model="form.phone"
                v-mask="'+7(###)-###-##-##'"
                :label="$lang.sbpPhone"
                :placeholder="$lang.enterPhone"
            )
            v-input(
                v-model="form.recipient"
                :label="$lang.sbpRecipientName"
                :placeholder="$lang.enterRecipientName"
            )
        v-button.button(
            :isLoading="isPending"
            @click="save"
        ) {{ $lang.save }}
</template>

<script>
import { mask } from 'vue-the-mask';

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

    directives: { mask },

    computed: {
        isEdit() {
            return !!this.componentData;
        },

        title() {
            return this.isEdit ? this.$lang.editingCard : this.$lang.addingNewCard;
        },

        cardId() {
            return this.componentData?.cardId;
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
                isSbp: false,
                phone: '',
                recipient: ''
            },
            isPending: false,
        };
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        async save() {
            try {
                this.isPending = true;

                const form = {
                    ...this.form,
                    cardNumber: this.form.cardNumber.split(' ').join(''),
                };

                if (this.isEdit) {
                    await this.$api.cards.editCard({
                        ...form,
                        cardId: this.cardId,
                    });
                } else {
                    await this.$api.cards.createCard(form);
                }

                this.$store.dispatch('cards/getCards', this.$route.query);
                this.close();
            } catch (error) {
                console.log(error);
            } finally {
                this.isPending = false;
            }
        },

        setCardFields() {
            const formKeys = Object.keys(this.form);

            formKeys.forEach((key) => {
                if (this.componentData.hasOwnProperty(key)) {
                    this.form[key] = this.componentData[key];
                }
            });
        },
    },

    mounted() {
        if (this.isEdit) {
            this.setCardFields();
        }
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