<template lang="pug">
    .profile-cards
        .header
            .title Мои карты
        v-table(
            :headItems="headItems"
            :bodyItems="bodyItems"
        )
    app-pagination
</template>

<script>
import AppPagination from '@/components/Pagination/AppPagination.vue';
import VTable from '@/components/common/VTable.vue';

export default {
    name: 'ProfileCards',

    components: {
        AppPagination,
        VTable,
    },

    data() {
        return {
            headItems: [
                {
                    title: 'ID карты',
                    key: 'id',
                },
                {
                    title: 'Название',
                    key: 'title',
                },
                {
                    title: 'Номер карты',
                    key: 'cardNumber',
                    searchable: true,
                },
            ],
            bodyItems: [
                {
                    id: 22157,
                    title: 'Судоргина 56 №16',
                    cardNumber: '2202 2062 5064 6689',
                },
                {
                    id: 22158,
                    title: 'Судоргина 57 №16',
                    cardNumber: '2232 2062 5064 6687',
                },
            ],
        }
    },
};
</script>

<style lang="sass" scoped>
.profile-cards
    display: flex
    flex-direction: column
    margin-top: 0.8rem
    padding: 2.4rem 3.2rem
    background-color: $color-white
    border-radius: 2rem 0 0 0
    width: 100%
    flex: 1 1 auto
</style>