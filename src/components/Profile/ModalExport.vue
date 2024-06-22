<template lang="pug">
    .wrapper
        button.close(@click="close")
            inline-svg.icon(src="/icons/close.svg")
        .title {{ $lang.exportData }}
        .form
            v-dropdown(
                v-model="cashbox"
                :list="cashboxesList"
                :label="$lang.cashbox"
            )
            v-date-picker(
                v-model="date"
                :label="$lang.date"
                isRange
                placeholder="ДД/ММ/ГГ — ДД/ММ/ГГ"
            )
        v-button.button(
            :isLoading="isLoading"
            @click="callbackExport"
        ) {{ $lang.unload }}
</template>

<script>
import VButton from '@/components/common/VButton.vue';
import VDropdown from '@/components/common/VDropdown.vue';
import VDatePicker from '@/components/common/VDatePicker.vue';

import { formatDate } from '@/helpers/string';

export default {
    name: 'ModalExport',

    components: {
        VButton,
        VDropdown,
        VDatePicker,
    },

    props: {
        componentData: {
            type: Object,
            default: null,
        },
    },

    data() {
        return {
            cashbox: 0,
            date: null,
            isLoading: false,
        };
    },

    computed: {
        cashboxesList() {
            const cashboxes = this.componentData?.cashboxes || [];
            const cashboxesList = cashboxes.map((cashbox) => {
                return {
                    id: cashbox.cashboxId,
                    title: cashbox.title,
                };
            });

            return [
                { id: 0, title: this.$lang.all },
                ...cashboxesList,
            ];
        },
    },

    methods: {
        close() {
            this.$store.commit('modal/close');
        },

        async callbackExport() {
            if (!this.componentData?.callback || !this.date) {
                return;
            }

            const [dateStart, dateEnd] = this.date;
            const params = {
                dateStart: formatDate(dateStart).split('.').join('-'),
                dateEnd: formatDate(dateEnd).split('.').join('-'),
            };

            if (this.cashbox) {
                params.cashboxes = this.cashbox;
            }

            try {
                this.isLoading = true;
                await this.componentData.callback(params);
            } catch (error) {
                throw error;
            } finally {
                this.isLoading = false;
            }
        },
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
    .form
        display: flex
        flex-direction: column
        gap: 2rem
        margin-bottom: 4rem
    .button
        width: 100%
</style>