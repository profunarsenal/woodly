<template lang="pug">
    profile-wrapper(:title="$lang.payouts")
</template>

<script>
import ProfileWrapper from '@/components/Profile/ProfileWrapper.vue';

export default {
    name: 'ProfilePayments',

    components: {
        ProfileWrapper,
    },
};
</script>
