<template lang="pug">
    profile-wrapper(
        :title="$lang.users"
        :pagination="pagination"
        :items="users"
    )
        template(#header)
            v-button(
                type="outline"
                iconSrc="/icons/plus.svg"
                @click="openModalUser"
            ) {{ $lang.add }}

        template(#content)
            v-table.table-users(
                :headers="tableHeaders"
                :items="users"
                :isLoading="isLoading"
            )
                template(#role="{ item }")
                    div {{ rolesRussian[item.role] }}
                template(#thead)
                    .thead-item
                        .title {{ $lang.info }}
                template(#tbody="{ item }")
                    users-controls(:item="item")

</template>

<script>
import { mapState } from 'vuex';

import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import VButton from '@/components/common/VButton.vue';
import VTable from '@/components/common/VTable.vue';
import UsersControls from '@/components/Profile/Users/UsersControls.vue';

import { USERS } from '@/helpers/table';
import { ROLES_RUSSIAN } from '@/helpers/constants';

export default {
    name: 'ProfileUsers',

    components: {
        ProfileWrapper,
        VButton,
        VTable,
        UsersControls,
    },

    data() {
        return {
            tableHeaders: USERS,
            rolesRussian: ROLES_RUSSIAN,
            isLoading: false,
            urlParams: Object.assign({}, this.$route.query),
        };
    },

    computed: {
        ...mapState({
            users: ({ users }) => users.users,
            pagination: ({ users }) => users.pagination,
        }),
    },

    methods: {
        async getUsers() {
            this.isLoading = true;

            try {
                await this.$store.dispatch('users/getUsers', this.urlParams);
            } catch (error) {
                console.log(error);
            } finally {
                this.isLoading = false;
            }
        },

        openModalUser() {
            this.$store.commit('modal/open', {
                component: 'ModalUser',
            });
        },
    },

    watch: {
        '$route.query': {
            handler(query) {
                this.urlParams = Object.assign({}, query);
                this.getUsers();
            },
            deep: true,
        },
    },

    async created() {
        await this.getUsers();
    },
};
</script>

<style lang="sass" scoped>
$col-size-1: minmax(12.11%, 1fr)
$col-size-2: minmax(20.42%, 1fr)
$col-size-3: minmax(6.23%, 1fr)

.table-users
    &:deep(.table)
        grid-template-columns: $col-size-1 repeat(4, $col-size-2) $col-size-3
    .thead-item .title
        font-weight: 500
        font-size: 1.4rem
        line-height: 2rem
</style>