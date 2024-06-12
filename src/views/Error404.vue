<template lang="pug">
    .error-404
        //- .angle
        //-     img.ufo.center(src="/images/404/ufo.png")
        .content
            .title Мы не смогли найти эту страницу
            .subtitle Страницы не существует или она была удалена. Нажмите кнопку ниже, чтобы вернуться назад
            v-button.button(
                type="secondary"
                @click="back"
            ) Вернуться назад
</template>

<script>
import { mapGetters } from 'vuex';
import VButton from '@/components/common/VButton.vue';
import { API, USER_PAGES } from '@/helpers/constants';

export default {
    name: 'Error404',

    components: {
        VButton,
    },

    computed: {
        ...mapGetters({
            isAuth: 'auth/isAuth',
            role: 'auth/role',
        }),
    },

    methods: {
        back() {
            if (this.isAuth && this.role) {
                const sidebarItems = USER_PAGES[this.role] || [];
                const redirectPath = sidebarItems[0]?.path;

                this.$router.push(redirectPath);
            } else {
                this.$router.push(API.main)
            }
        },
    },
};
</script>

<style lang="sass" scoped>
.error-404
    position: relative
    height: 100%
    background-color: $color-violet-100
    display: flex
    align-items: center
    justify-content: center
    overflow: hidden
    // .angle
    //     position: absolute
    //     bottom: 0
    //     left: 50%
    //     width: 80%
    //     height: calc( 70% + 14rem )
    //     transform: translateX(-50%)
    //     &::after
    //         content: ''
    //         position: absolute
    //         bottom: -14rem
    //         width: 100%
    //         height: 100%
    //         background: linear-gradient(180deg, rgba(255, 255, 255, 0.26) -1.17%, rgba(255, 255, 255, 0) 90.26%)
    //         clip-path: polygon(50% 0%, 0% 100%, 100% 100%)
    // .ufo
    //     position: absolute
    //     z-index: 99
    //     &.center
    //         top: 0
    //         left: 50%
    //         width: 38rem
    //         height: 38rem
    //         transform: translateX(-50%)
    .content
        max-width: 42rem
        text-align: center
    .title
        font-weight: 600
        font-size: 2rem
        line-height: 2.8rem
        color: $color-white
        margin-bottom: 0.6rem
    .subtitle
        font-size: 1.4rem
        line-height: 2rem
        color: rgba($color-white, 0.7)
        margin-bottom: 3.2rem
    .button
        margin: 0 auto
</style>