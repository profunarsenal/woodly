<template lang="pug">
    .profile-auth
        .cover
            //- img.image.image-dollar(src="/images/big-icon/dollar.png")
            //- img.image.image-bitcoin(src="/images/big-icon/bitcoin.png")
            //- img.image.image-rouble(src="/images/big-icon/rouble.png")
            //- img.image.image-wallet(src="/images/big-icon/wallet.png")
            inline-svg.logo(src="/images/logo.svg")
        .content
            .form
                .title {{ $lang.loginToYourPersonalAccount }}
                .controls
                    v-input.control(
                        v-model.trim="form.login"
                        :placeholder="$lang.email"
                    )
                    v-input.control(
                        v-model.trim="form.password"
                        :placeholder="$lang.password"
                        type="password"
                        autocomplete="new-password"
                        isPassword
                    )
                    v-input.control(
                        v-model.trim="code"
                        :placeholder="$lang.code"
                    )
                    v-button.button(
                        :isDisabled="!isFormCompleted || isPending"
                        :isLoading="isPending"
                        @click="login"
                    ) {{ $lang.toComeIn }}
                a.support(
                    href="#"
                    target="_blank"
                ) {{ supportEmail }}
</template>

<script>
import { mapGetters } from 'vuex';

import VInput from '@/components/common/VInput.vue';
import VButton from '@/components/common/VButton.vue';

import { USER_PAGES, SUPPORT_EMAIL } from '@/helpers/constants';

export default {
    name: 'ProfileAuthorization',

    components: {
        VInput,
        VButton,
    },

    data() {
        return {
            form: {
                login: '',
                password: '',
            },
            isPending: false,
            code: '',
        };
    },

    computed: {
        ...mapGetters({
            role: 'auth/role',
        }),

        isFormCompleted() {
            return !!(this.form.login && this.form.password);
        },
    },

    methods: {
        async login() {
            if (this.isPending || !this.isFormCompleted) {
                return;
            }

            try {
                this.isPending = true;
                await this.$store.dispatch('auth/login', this.form);

                const sidebarItems = USER_PAGES[this.role] || [];
                const redirectPath = sidebarItems[0]?.path;

                this.$router.push(redirectPath);
            } catch (error) {
                console.log(error);
            } finally {
                this.isPending = false;
            }
        },
    },

    created() {
        this.supportEmail = SUPPORT_EMAIL;
    },
};
</script>

<style lang="sass" scoped>
.profile-auth
    display: flex
    height: 100%
    .cover
        position: relative
        display: flex
        align-items: center
        justify-content: center
        flex: 1 1 60%
        background-color: $color-violet-100
        overflow: hidden
        &::after
            content: ''
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            background-color: $color-violet-100
            opacity: 0.8
        .logo
            position: relative
            z-index: 2
            width: 23.5rem
            height: 7rem
        .image
            position: absolute
            &-dollar
                top: -10rem
                left: 0
                width: 41.4rem
                height: 41.4rem
            &-bitcoin
                top: -3rem
                right: -14rem
                width: 52.2rem
                height: 52.2rem
            &-rouble
                bottom: -17rem
                right: 0
                width: 46.8rem
                height: 46.8rem
            &-wallet
                bottom: -9rem
                left: -8rem
                width: 51.8rem
                height: 51.8rem
    .content
        flex: 1 1 40%
        display: flex
        align-items: center
        justify-content: center
        background-color: $color-white
        .form
            display: flex
            flex-direction: column
            gap: 4.8rem
            min-width: 34rem
            text-align: center
            .title
                font-weight: 600
                font-size: 2rem
                line-height: 2.8rem
            .controls
                display: flex
                flex-direction: column
                gap: 2rem
            .button
                width: 100%
                margin-top: 0.4rem
        .support
            font-size: 1.4rem
            line-height: 2rem
            color: $color-black
            transition: color 0.2s ease
            @media(any-hover:hover)
                &:hover
                    color: $color-gray-dark
</style>