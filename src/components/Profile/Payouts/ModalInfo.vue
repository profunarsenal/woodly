<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")

        .title {{ $lang.payoutInformation }}

        table-list(
            :keys="tableKeys"
            :item="componentData"
        )
            template(#dateCreate="{ item }")
                table-date(
                    v-if="item.dateCreate"
                    :date="item.dateCreate"
                )
</template>

<script>
import VButton from '@/components/common/VButton.vue';
import TableList from '@/components/app/TableList.vue';
import TableDate from '@/components/common/Table/TableDate.vue';

import { PAYOUTS_INFO } from '@/helpers/table';

export default {
    name: 'ModalInfo',

    components: {
        VButton,
        TableList,
        TableDate,
    },

    props: {
        componentData: {
            type: Object,
            default: null,
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },
    },

    created() {
        this.tableKeys = PAYOUTS_INFO;
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
</style>