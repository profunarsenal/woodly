<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title {{ title }}
        .form
            v-input(
                v-model="form.name"
                label="Название"
                placeholder="Введите название"
            )
            v-input(
                v-model="form.email"
                label="Email"
                placeholder="Введите email"
            )
            v-input(
                v-model="form.login"
                label="Логин"
                placeholder="Введите логин"
            )
            v-input(
                v-model="form.password"
                label="Пароль"
                placeholder="Введите пароль"
                type="password"
                autocomplete="new-password"
                isPassword
            )
            v-dropdown(
                v-model="form.role"
                :list="typesAccount"
                label="Тип аккаунта"
                placeholder="Выберите тип аккаунта"
            )
            .checkboxes(v-if="form.role")
                v-checkbox(
                    v-model="isFullAccess"
                    id="full-access"
                    label="Полный доступ"
                    @onChange="setFullAccess"
                )
                .permissions
                    v-checkbox(
                        v-for="page in pages"
                        :key="page.id"
                        v-model="checkboxes[page.permission]"
                        :label="page.title"
                        :id="page.permission"
                        @onChange="setCheckboxValue"
                    )
        .buttons
            v-button.button(
                @click="save"
            ) {{ buttonTitle }}
</template>

<script>
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import VDropdown from '@/components/common/VDropdown.vue';
import VCheckbox from '@/components/common/VCheckbox.vue';
import { ROLES_RUSSIAN, USER_PAGES } from '@/helpers/constants';

const SWITCHES_CHECKBOXES = {
    on: true,
    off: false,
};

export default {
    name: 'ModalCorrection',

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

    data() {
        return {
            form: {
                name: '',
                email: '',
                login: '',
                password: '',
                role: '',
                permissions: [],
            },
            checkboxes: {},
            isFullAccess: false,
        };
    },

    computed: {
        isEdit() {
            return !!this.componentData;
        },

        title() {
            return this.isEdit ? 'Редактирование пользователя' : 'Создание нового пользователя';
        },

        buttonTitle() {
            return this.isEdit ? 'Сохранить' : 'Создать';
        },

        typesAccount() {
            return Object.entries(ROLES_RUSSIAN).map((item) => {
                const [id, title] = item;
                return {
                    id,
                    title,
                };
            });
        },

        pages() {
            if (!this.form.role) {
                return [];
            }

            return USER_PAGES[this.form.role];
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        save() {

        },

        switchAllCheckboxes(value) {
            this.pages.forEach((item) => {
                this.checkboxes[item.permission] = value;
            });
        },

        setCheckboxValue() {
            const checkboxesValue = Object.values(this.checkboxes);
            const isAllCheckboxesOn = checkboxesValue.every(item => item === SWITCHES_CHECKBOXES.on);

            if (!this.isFullAccess && isAllCheckboxesOn) {
                this.isFullAccess = SWITCHES_CHECKBOXES.on;
            }

            if (this.isFullAccess && !isAllCheckboxesOn) {
                this.isFullAccess = SWITCHES_CHECKBOXES.off;
            }
        },

        setFullAccess(value) {
            this.switchAllCheckboxes(value);
        },
    },

    watch: {
        'form.role'() {
            this.switchAllCheckboxes(SWITCHES_CHECKBOXES.off);
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
    .button
        width: 100%
    .permissions
        display: flex
        justify-content: center
        flex-wrap: wrap
        row-gap: 1.6rem
        margin-top: 1.6rem
        padding-left: 2.8rem
        &:deep(.checkbox)
            flex: 1 0 50%
</style>