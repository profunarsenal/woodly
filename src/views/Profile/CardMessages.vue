<template lang="pug">
    .card-messages
        .header
            square-button.back(
                icon="/icons/arrow.svg"
                @click="back"
            )
            .title Общие СМС по карте
            .subtitle {{ $route.query.cardLastNumber }}
        .table-wrapper
            v-table(
                :headers="headers"
                :items="messages"
            )
                template(#dateCreate="{ item }")
                    .date {{ formatTableDate(item.dateCreate).date }} · 
                        |
                        span.time {{ formatTableDate(item.dateCreate).time }}
</template>

<script>
import SquareButton from '@/components/common/Buttons/SquareButton.vue';
import VTable from '@/components/common/VTable.vue';
import { CARD_MESSAGES } from '@/helpers/table';
import { formatDate, formatTime } from '@/helpers/string';

export default {
    name: 'AutoPayments',

    components: {
        SquareButton,
        VTable,
    },

    data() {
        return {
            headers: CARD_MESSAGES,
            messages: [],
        };
    },

    methods: {
        back() {
            this.$router.push('/profile/cards');
        },

        formatTableDate(date) {
            return {
                date: formatDate(date),
                time: formatTime(date),
            };
        },

        async getMessages() {
            const params = {
                cardLastNumber: this.$route.query.cardLastNumber,
                page: this.$route.query.page,
            };
            const { data } = await this.$api.cards.getCardMessages(params);

            this.messages = data.messages;
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
.card-messages
    margin-top: 0.8rem
    padding: 2.4rem 3.2rem
    background-color: $color-white
    border-radius: 2rem 0 0 0
    width: 100%
    flex: 1 1 auto
    .header
        display: flex
        align-items: center
        gap: 1.6rem
        margin-bottom: 3.2rem
        .title,
        .subtitle
            font-weight: 600
            font-size: 3.2rem
            line-height: 3.2rem
        .subtitle
            color: $color-gray-dark

.time
    color: $color-gray-dark
</style>