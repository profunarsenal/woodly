<template lang="pug">
    .profile-purchases
        .header
            .title Покупка
            .export
                v-button(
                    type="outline"
                    iconSrc="/icons/download.svg"
                    size="small"
                    @click="openExport"
                ) Экспорт
                export-window(
                    v-if="isOpenExport"
                    v-click-outside="closeExport"
                    @unload="unloadTransactions"
                )
</template>

<script>
import VButton from '@/components/common/VButton.vue';
import ExportWindow from '@/components/Profile/ExportWindow.vue';
import { exportTransactions } from '@/helpers/url';

export default {
    name: 'ProfilePurchases',

    components: {
        VButton,
        ExportWindow,
    },

    data() {
        return {
            isOpenExport: false,
        };
    },

    methods: {
        openExport() {
            this.isOpenExport = true;
        },

        closeExport() {
            this.isOpenExport = false;
        },

        async unloadTransactions(date) {
            const { dateStart, dateEnd } = date;

            try {
                await exportTransactions(dateStart, dateEnd);
            } catch (error) {
                console.log(error);
            }
        },
    },
};
</script>

<style lang="sass" scoped>
.profile-purchases
    display: flex
    flex-direction: column
    margin-top: 0.8rem
    padding: 2.4rem 3.2rem 9.8rem 3.2rem
    background-color: $color-white
    border-radius: 2rem 0 0 0
    width: 100%
    flex: 1 1 auto

.header
    display: flex
    align-items: center
    justify-content: space-between
    gap: 1.6rem
    margin-bottom: 3.2rem
    .title
        font-weight: 600
        font-size: 3.2rem
        line-height: 3.2rem
    .export
        position: relative
</style>