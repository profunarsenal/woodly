<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title {{ title }}
        .form
            v-input(
                v-model="form.title"
                :label="$lang.cashboxName"
                :placeholder="$lang.enterCashboxName"
            )
            v-input(
                v-model="form.url"
                :label="$lang.url"
                :placeholder="$lang.enterUrl"
            )
            v-input(
                v-model="form.successUrl"
                :label="$lang.successUrl"
                :placeholder="$lang.enterSuccessUrl"
            )
            v-input(
                v-model="form.errorUrl"
                :label="$lang.errorUrl"
                :placeholder="$lang.enterErrorUrl"
            )
            v-input(
                v-model="form.notificationUrlPayments"
                :label="$lang.notificationUrlPayments"
                :placeholder="$lang.enterNotificationUrlPayments"
            )
            v-input(
                v-model="form.notificationUrlPayOff"
                :label="$lang.notificationUrlPayouts"
                :placeholder="$lang.enterNotificationUrlPayouts"
            )
            v-dropdown(
                v-model="form.commissionPayer"
                :list="comissionPayers"
                :label="$lang.whoPaysComission"
                :placeholder="$lang.selectFromList"
            )
            v-input(
                v-if="isEdit"
                v-model="form.apiKey"
                isDisabled
                isReadonly
                :label="$lang.apiKey"
                :placeholder="$lang.apiKey"
            )
        v-button.button(
            :isLoading="isPending"
            @click="save"
        ) {{ buttonTitle }}
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import VDropdown from '@/components/common/VDropdown.vue';

const COMISSION_PAYERS = {
    shop: {
        id: '1',
        title: 'Магазин',
    },
    recipient: {
        id: '2',
        title: 'Получатель',
    },
};

export default {
    name: 'ModalCashbox',

    components: {
        VInput,
        VButton,
        VDropdown,
    },

    props: {
        componentData: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            form: {
                title: '',
                url: '',
                successUrl: '',
                errorUrl: '',
                notificationUrlPayments: '',
                notificationUrlPayOff: '',
                commissionPayer: '',
                apiKey: '',
            },
            comissionPayers: Object.values(COMISSION_PAYERS),
            isPending: false,
        };
    },

    computed: {
        isEdit() {
            return !!this.componentData;
        },

        title() {
            return this.isEdit ? this.$lang.editingCashbox : this.$lang.addingNewCashbox;
        },

        buttonTitle() {
            return this.isEdit ? this.$lang.save : this.$lang.add;
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        async save() {
            const request = this.isEdit ? this.edit : this.create;

            try {
                this.isPending = true;
                await request();
                this.close();
            } catch (error) {
                console.log(error);
            } finally {
                this.isPending = false;
            }
        },

        edit() {
            return () => ({});
        },

        create() {
            const form = this.form;
            form.commissionPayer = +this.form.commissionPayer;
            return this.$store.dispatch('cashboxes/createCashbox', form);
        },

        setCashbox() {
            for (const key in this.form) {
                if (this.componentData[key]) {
                    this.form[key] = this.componentData[key];
                }
            }
        },
    },

    created() {
        if (this.isEdit) {
            this.setCashbox();
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

    .button
        width: 100%

</style>