<template lang="pug">
    profile-wrapper(:title="$lang.payments")
        template(#header)
            v-button(
                type="outline"
                iconSrc="/icons/plus.svg"
            ) {{ $lang.createPayment }}
</template>

<script>
import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';
import VButton from '@/components/common/VButton.vue';

export default {
    name: 'ProfilePayments',

    components: {
        ProfileWrapper,
        VButton,
    },
};
</script>
