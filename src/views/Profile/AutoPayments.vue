<template lang="pug">
    profile-wrapper(:title="$lang.automaticPaymentsByCard")
        template(#header)
            button-square.back(
                icon="/icons/arrow.svg"
                @click="back"
            )
            .subtitle {{ $route.query.cardLastNumber }}
        template(#content)
            .table-wrapper
                v-table(
                    :headers="headers"
                    :items="autopayments"
                )
                    template(#paymentTime="{ item }")
                        table-date(
                            v-if="item.paymentTime"
                            :date="item.paymentTime"
                        )
</template>

<script>
import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import ButtonSquare from '@/components/common/Buttons/ButtonSquare.vue';
import VTable from '@/components/common/VTable.vue';
import TableDate from '@/components/common/Table/TableDate.vue';

import { AUTOPAYMENTS } from '@/helpers/table';
import { PAGES } from '@/helpers/constants';

export default {
    name: 'ProfileAutoPayments',

    components: {
        ProfileWrapper,
        ButtonSquare,
        VTable,
        TableDate,
    },

    data() {
        return {
            autopayments: [],
        };
    },

    methods: {
        back() {
            this.$router.push(PAGES.profile.cards);
        },

        async getAutoPayments() {
            const params = {
                cardLastNumber: this.$route.query.cardLastNumber,
                page: this.$route.query.page,
            };
            const { autopayments } = await this.$api.cards.getAutoPayments(params);

            this.autopayments = autopayments;
        }
    },

    async created() {
        this.headers = AUTOPAYMENTS;

        if (this.$route.params.id) {
            this.getAutoPayments();
        }
    },
};
</script>

<style lang="sass" scoped>
.subtitle
    font-weight: 600
    font-size: 3.2rem
    line-height: 3.2rem
    color: $color-gray-dark

.back
    order: -1
</style>