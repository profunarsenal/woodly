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
                v-if="!isEdit"
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
            v-input(
                v-model="form.address"
                label="Адрес кошелька"
                placeholder="Введите адрес кошелька"
            )
            v-dropdown(
                v-model="form.role"
                :list="typesAccount"
                label="Тип аккаунта"
                placeholder="Выберите тип аккаунта"
                @onChange="switchAllCheckboxes(switchesCheckboxes.off)"
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
                v-if="isEdit"
                type="negative"
                @click="openModalDeleteUser"
            ) Деактивировать пользователя
            v-button.button(
                :isLoading="isPending"
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
    name: 'ModalUser',

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
                address: '',
                permissions: [],
            },
            checkboxes: {},
            isFullAccess: false,
            isPending: false,
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

        async save() {
            this.addPermissions();
            const request = this.isEdit ? this.editUser : this.createUser;

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

        editUser() {
            const user = {
                userId: this.componentData?.userId,
                name: this.form.name,
                email: this.form.email,
                password: this.form.password,
                role: this.form.role,
                permissions: this.form.permissions,
                address: this.form.address,
            };

            return this.$store.dispatch('users/editUser', user);
        },

        createUser() {
            return this.$store.dispatch('users/createUser', this.form);
        },

        async deleteUser() {
            await this.$store.dispatch('users/deleteUser', this.componentData?.userId);
        },

        addPermissions() {
            for (const permission in this.checkboxes) {
                if (this.checkboxes[permission]) {
                    this.form.permissions.push(permission);
                }
            }
        },

        setUser() {
            for (const key in this.form) {
                if (this.componentData[key]) {
                    this.form[key] = this.componentData[key];
                }
            }

            this.pages.forEach((item) => {
                const hasPermission = this.form.permissions?.includes(item.permission);
                const checkboxValue = hasPermission ? SWITCHES_CHECKBOXES.on : SWITCHES_CHECKBOXES.off;
                this.checkboxes[item.permission] = checkboxValue;
            });

            this.setCheckboxValue();
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

        openModalDeleteUser() {
            this.$store.commit('modal/open', {
                component: 'ModalConfirm',
                positionCenter: true,
                componentData: {
                    item: this.item,
                    type: 'negative',
                    title: 'Деактивация пользователя',
                    subtitle: 'Вы уверены, что хотите деактивировать пользователя Admin?',
                    buttonConfirm: 'Удалить',
                    callbackConfirm: () => this.deleteUser(),
                },
            });
        },
    },

    created() {
        this.switchesCheckboxes = SWITCHES_CHECKBOXES;

        if (this.isEdit) {
            this.setUser();
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
    .buttons
        display: flex
        flex-direction: column
        gap: 0.8rem
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