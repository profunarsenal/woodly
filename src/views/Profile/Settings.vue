<template lang="pug">
    profile-wrapper(title="Настройки")
        template(#content)
            .form
                .controls
                    v-input.control(
                        v-model="form.email"
                        label="Email"
                        placeholder="Введите email"
                    )
                    v-input.control(
                        v-model="form.traderId"
                        label="Trader ID"
                        placeholder="Введите ID"
                    )
                    v-input.control(
                        v-model="form.telegram"
                        label="Контакт Telegram"
                        placeholder="Контакт Telegram"
                    )
                    v-input.control(
                        v-model="form.password"
                        label="Пароль"
                        placeholder="Введите пароль"
                        type="password"
                        autocomplete="new-password"
                        isPassword
                    )
                    v-input.control(
                        v-model="form.apiKey"
                        label="API KEY"
                        placeholder="API KEY"
                    )
                    v-input.control(
                        v-model="form.telegramId"
                        label="Telegram ID"
                        placeholder="Telegram ID"
                    )
                v-button.button(isDisabled) Сохранить
            .header
                .title Активные сессии
                .subtitle 6
                v-button.close-session(
                    type="outline"
                    size="small"
                    @click="openModalSessions"
                ) Закрыть все сессии кроме текущей
        template(#footer)
            .footer
                telegram-button
                .buttons
                    square-button(
                        icon="/icons/qr-code.svg"
                        @click="openQR"
                    )
                    v-button.button-go(
                        size="small"
                        iconSrc="/icons/arrow.svg"
                    ) Перейти
</template>

<script>
import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';
import TelegramButton from '@/components/common/Buttons/TelegramButton.vue';
import SquareButton from '@/components/common/Buttons/SquareButton.vue';

export default {
    name: 'ProfileSettings',

    components: {
        ProfileWrapper,
        VInput,
        VButton,
        TelegramButton,
        SquareButton,
    },

    data() {
        return {
            form: {
                email: '',
                traderId: '',
                telegram: '',
                password: '',
                apiKey: '',
                telegramId: '',
            },
        };
    },

    methods: {
        openModalSessions() {
            this.$store.commit('modal/open', {
                component: 'ModalSessions',
                positionCenter: true,
            });
        },

        openQR() {
            this.$store.commit('modal/open', {
                component: 'ModalSettingsQR',
                positionCenter: true,
            });
        },
    },
};
</script>

<style lang="sass" scoped>
.header
    display: flex
    align-items: center
    justify-content: flex-start
    gap: 1.6rem
    margin-bottom: 3.2rem
    .title,
    .subtitle
        font-weight: 600
        font-size: 3.2rem
        line-height: 3.2rem
    .subtitle
        color: $color-silver-light

.close-session
    margin-left: auto

.form
    margin-bottom: 7.2rem
    .controls
        display: flex
        flex-wrap: wrap
        align-items: center
        column-gap: 2.4rem
        row-gap: 2rem
        margin-bottom: 3.2rem
        .control
            flex: 1 1 30%
    .button
        min-width: 16.4rem

.footer
    position: fixed
    bottom: 0
    right: 0
    width: calc( 100% - 22rem )
    z-index: 50
    display: flex
    justify-content: space-between
    padding: 2rem 3.2rem
    background-color: $color-gray-light-2
    &::after
        content: ''
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 0.1rem
        background-color: $color-gray-100
    .buttons
        display: flex
        align-items: center
        gap: 0.8rem
        .button-go:deep(.icon)
            transform: rotate(180deg)
</style>