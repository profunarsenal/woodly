<template lang="pug">
    profile-wrapper(:title="$lang.generalSmsBycard")
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
                    :items="messages"
                )
                    template(#dateCreate="{ item }")
                        table-date(
                            v-if="item.dateCreate"
                            :date="item.dateCreate"
                        )
</template>

<script>
import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import ButtonSquare from '@/components/common/Buttons/ButtonSquare.vue';
import VTable from '@/components/common/VTable.vue';
import TableDate from '@/components/common/Table/TableDate.vue';

import { CARD_MESSAGES } from '@/helpers/table';
import { PAGES } from '@/helpers/constants';

export default {
    name: 'ProfileCardMessages',

    components: {
        ProfileWrapper,
        ButtonSquare,
        VTable,
        TableDate,
    },

    data() {
        return {
            headers: CARD_MESSAGES,
            messages: [],
        };
    },

    methods: {
        back() {
            this.$router.push(PAGES.profile.cards);
        },

        async getMessages() {
            const params = {
                cardLastNumber: this.$route.query.cardLastNumber,
                page: this.$route.query.page,
            };
            const { messages } = await this.$api.cards.getCardMessages(params);

            this.messages = messages;
        }
    },

    async created() {
        if (this.$route.params.id) {
            this.getMessages();
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